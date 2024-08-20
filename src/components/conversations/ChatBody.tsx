import { useCallback, useEffect, useRef } from "react";
import { useParams } from "wouter";
import { useGetConversation } from "../../hooks/useGetConversation";
import { useMessages } from "../../hooks/useMessages";
import { useUnreadMessageCount } from "../../hooks/useUnreadMessageCount";
import { useUserConversation } from "../../hooks/useUserConversation";
import { InfiniteScroll } from "../InfiniteScroll";
import { ScrollProvider } from "../providers/ScrollProvider";
import { ScrollToTopButton } from "../SctollToTopButton";
import { ChatMessages } from "./ChatMessages";

export function ChatBody() {
  const { conversationId } = useParams<{ conversationId: string }>();
  const conversation = useGetConversation(conversationId);
  const unreadMessageCount = useUnreadMessageCount(conversation);
  const updateLastSeenAt = useUserConversation();
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
        <ScrollToTopButton viewportRef={viewport} label={unreadMessageCount} />
      </InfiniteScroll>
    </ScrollProvider>
  );
}
