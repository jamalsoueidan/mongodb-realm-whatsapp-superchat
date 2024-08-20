import { useCallback, useEffect, useRef } from "react";
import { useParams } from "wouter";
import { useGetConversation } from "../../hooks/useGetConversation";
import { useLastSeenConversation } from "../../hooks/useLastSeenConversation";
import { useMessages } from "../../hooks/useMessages";
import { useUnreadMessageCount } from "../../hooks/useUnreadMessageCount";
import { InfiniteScroll } from "../InfiniteScroll";
import { ScrollProvider } from "../providers/ScrollProvider";
import { ScrollToBottomButton } from "../ScrollToBottomButton";
import { ChatMessages } from "./ChatMessages";

export function ChatBody() {
  const { conversationId } = useParams<{ conversationId: string }>();
  const conversation = useGetConversation(conversationId);
  const unreadMessageCount = useUnreadMessageCount(conversation);
  const updateLastSeenAt = useLastSeenConversation();
  const viewport = useRef<HTMLDivElement>(null);
  const { messages, totalMessageCount, loadMore } = useMessages({
    conversationId,
    perPage: 20,
  });

  /* Scroll to bottom when sending a message from the input field */
  const lastMessageRef = useRef(messages[messages.length - 1]);
  useEffect(() => {
    const newestMessage = messages[messages.length - 1];

    if (
      lastMessageRef.current.message_id !== newestMessage.message_id &&
      newestMessage.recipient ===
        lastMessageRef.current.conversation?.customer_phone_number &&
      viewport.current
    ) {
      viewport.current.scrollTo({
        top: viewport.current.scrollHeight,
        behavior: "instant",
      });
      lastMessageRef.current = newestMessage;
    }
  }, [messages]);

  // Register last seen at when scroll at the bottom
  const onBottomReached = useCallback(() => {
    updateLastSeenAt();
  }, [updateLastSeenAt]);

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
