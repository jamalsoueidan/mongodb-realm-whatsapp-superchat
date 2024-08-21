import { useCallback, useEffect, useRef } from "react";
import { useParams } from "wouter";
import { useCountUnreadMessages } from "../../hooks/useCountUnreadMessages";
import { useGetConversation } from "../../hooks/useGetConversation";
import { useLastSeenConversation } from "../../hooks/useLastSeenConversation";
import { useMessages } from "../../hooks/useMessages";
import { useRealmUser } from "../../hooks/useRealmUser";
import { InfiniteScroll } from "../InfiniteScroll";
import { ScrollProvider } from "../providers/ScrollProvider";
import { ScrollToBottomButton } from "../ScrollToBottomButton";
import { ChatMessages } from "./ChatMessages";

export function ChatBody() {
  const { conversationId } = useParams<{ conversationId: string }>();
  const user = useRealmUser();
  const conversation = useGetConversation(conversationId);
  const unreadMessageCount = useCountUnreadMessages(conversation);
  const [, setLastSeenAt] = useLastSeenConversation(conversation);
  const viewport = useRef<HTMLDivElement>(null);
  const { messages, totalMessageCount, loadMore, lastMessageInConversation } =
    useMessages({
      conversationId,
      perPage: 20,
    });

  /* Scroll to bottom when sending a message from the input field */
  const lastScrolledMessageRef = useRef(messages[messages.length - 1]);
  useEffect(() => {
    const isDifferentMessageId = !lastScrolledMessageRef.current._id.equals(
      lastMessageInConversation._id
    );
    const isMessageSentByMe =
      lastMessageInConversation.user?.user_id === user.customData.user_id;

    if (isDifferentMessageId && isMessageSentByMe && viewport.current) {
      viewport.current.scrollTo({
        top: viewport.current.scrollHeight,
        behavior: "instant",
      });
      lastScrolledMessageRef.current = lastMessageInConversation;
    }
  }, [lastMessageInConversation, messages, user.customData.user_id, user.id]);

  // Register last seen at when scroll at the bottom
  const onBottomReached = useCallback(() => {
    setLastSeenAt();
  }, [setLastSeenAt]);

  // In case conversation dont have a scroll, we still need to update the last seen at
  useEffect(() => {
    setLastSeenAt();
  }, [setLastSeenAt]);

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
