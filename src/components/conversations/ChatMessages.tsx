import { useRef } from "react";
import { useParams } from "wouter";
import { useMessages } from "../../hooks/useMessages";
import { InfiniteScroll } from "../InfiniteScroll";
import { MessageSystem } from "./messages/MesageSystem";
import { MessageImage } from "./messages/MessageImage";
import { MessageInteractive } from "./messages/MessageInteractive";
import { MessageInteractiveReply } from "./messages/MessageInteractiveReply";
import { MessageText } from "./messages/MessageText";
import { MessageUnknown } from "./messages/MessageUnknown";

export function ChatMessages() {
  const { conversationId } = useParams<{ conversationId: string }>();
  const observerTarget = useRef(null);
  const { messages, totalMessageCount, loadMore } = useMessages({
    conversationId,
    perPage: 20,
  });

  return (
    <InfiniteScroll
      data={messages}
      totalData={totalMessageCount.length}
      loadMore={loadMore}
    >
      <div ref={observerTarget}></div>
      {messages.map((msg) => {
        if (msg.type === "text") {
          return <MessageText msg={msg} key={msg._id as any} />;
        } else if (msg.type === "image") {
          return <MessageImage msg={msg} key={msg._id as any} />;
        } else if (msg.type === "interactive" && msg.interactive) {
          return <MessageInteractive msg={msg} key={msg._id as any} />;
        } else if (msg.type === "interactive_reply" && msg.interactive_reply) {
          return <MessageInteractiveReply msg={msg} key={msg._id as any} />;
        } else if (msg.type === "system") {
          return <MessageSystem msg={msg} key={msg._id as any} />;
        } else {
          return <MessageUnknown msg={msg} key={msg._id as any} />;
        }
      })}
    </InfiniteScroll>
  );
}
