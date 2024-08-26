import { usePrevious } from "@mantine/hooks";
import { useCallback, useEffect, useRef } from "react";
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
  const { messages, totalMessageCount, loadMore, lastMessage } = useMessages({
    conversationId,
    perPage: 10,
  });

  const previousMessage = usePrevious(lastMessage);
  useEffect(() => {
    if (!lastMessage || !previousMessage) return;

    const isDifferentMessageId = !previousMessage._id.equals(lastMessage._id);
    const isMessageSentByMe =
      lastMessage.user?.user_id === user.customData.user_id;

    /* Scroll to bottom when sending a message from the input field */
    if (isDifferentMessageId && isMessageSentByMe && viewport.current) {
      viewport.current.scrollTo({
        top: viewport.current.scrollHeight,
        behavior: "instant",
      });
    }
  }, [lastMessage, previousMessage, user.customData.user_id]);

  // Register last seen at when scroll at the bottom
  const onBottomReached = useCallback(() => {
    setLastSeenAt();
  }, [setLastSeenAt]);

  // In case conversation dont have a scroll, we still need to update the last seen at
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
