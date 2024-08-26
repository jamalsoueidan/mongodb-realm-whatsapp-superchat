import { usePrevious } from "@mantine/hooks";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "wouter";
import { useCountUnreadMessages } from "../../../hooks/useCountUnreadMessages";
import { useGetConversation } from "../../../hooks/useGetConversation";
import { useLastSeenConversation } from "../../../hooks/useLastSeenConversation";
import { useMessages } from "../../../hooks/useMessages";
import { useRealmUser } from "../../../hooks/useRealmUser";
import { InfiniteScroll } from "../../InfiniteScroll";
import { ScrollProvider } from "../../providers/ScrollProvider";
import { ScrollToBottomButton } from "../../ScrollToBottomButton";
import { ChatMessages } from "./ChatMessages";

export function ChatBody() {
  const { conversationId } = useParams<{ conversationId: string }>();
  const user = useRealmUser();
  const conversation = useGetConversation(conversationId);
  const unreadMessageCount = useCountUnreadMessages(conversation);
  const [, setLastSeenAt] = useLastSeenConversation(conversation);
  const viewport = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const { messages, totalMessageCount, loadMore, lastMessage } = useMessages({
    conversationId,
    perPage: 10,
  });

  // Scroll to the bottom when a new message is sent or received,
  // Scroll to the bottom only if the user was already at the bottom before the message was added
  const previousMessage = usePrevious(lastMessage);
  useEffect(() => {
    if (!lastMessage || !previousMessage || !viewport.current) return;

    const isDifferentMessageId = !previousMessage._id.equals(lastMessage._id);
    const isMessageSentByMe =
      lastMessage.user?.user_id === user.customData.user_id;

    if ((isDifferentMessageId && isMessageSentByMe) || isAtBottom) {
      viewport.current.scrollTo({
        top: viewport.current.scrollHeight,
        behavior: "instant",
      });
    }
  }, [isAtBottom, lastMessage, previousMessage, user.customData.user_id]);

  const onScrollPositionChange = useCallback(() => {
    if (!viewport.current) return;
    const isBottom =
      viewport.current?.scrollHeight -
        viewport.current.scrollTop -
        viewport.current.clientHeight <
      10;

    setIsAtBottom(isBottom);
  }, []);

  // Register last seen at when scroll at the bottom
  const onBottomReached = useCallback(() => {
    setLastSeenAt();
  }, [setLastSeenAt]);

  // In case conversation we dont have a scroll, we still need to update the last seen at
  useEffect(() => {
    setLastSeenAt();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollProvider>
      <InfiniteScroll
        conversationId={conversationId}
        data={messages}
        totalData={totalMessageCount}
        loadMore={loadMore}
        ref={viewport}
        onScrollPositionChange={onScrollPositionChange}
        onBottomReached={onBottomReached}
      >
        <ChatMessages viewportRef={viewport} messages={messages} />
        <ScrollToBottomButton
          viewportRef={viewport}
          label={unreadMessageCount}
        />
      </InfiniteScroll>
    </ScrollProvider>
  );
}
