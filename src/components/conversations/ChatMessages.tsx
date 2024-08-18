import { useQuery } from "@realm/react";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Realm from "realm";
import { useParams } from "wouter";
import { Message, MessageSchema } from "../../models/data";
import { MessageSystem } from "./messages/MesageSystem";
import { MessageImage } from "./messages/MessageImage";
import { MessageInteractive } from "./messages/MessageInteractive";
import { MessageInteractiveReply } from "./messages/MessageInteractiveReply";
import { MessageText } from "./messages/MessageText";
import { MessageUnknown } from "./messages/MessageUnknown";

const SIZE = 15;
export function ChatMessages() {
  const { conversationId } = useParams<{ conversationId: string }>();
  const [limit, setLimit] = useState(SIZE);

  const totalMessageCount = useQuery<Message>(
    MessageSchema.name,
    (collection) =>
      collection.filtered(
        `conversation._id = $0 AND hidden == $1`, //
        new Realm.BSON.ObjectId(conversationId),
        null
      ),
    [conversationId]
  );

  const messages = useQuery<Message>(
    MessageSchema.name,
    (collection) => {
      console.log(limit);
      return collection.filtered(
        `conversation._id = $0 AND hidden == $1 SORT(timestamp DESC) LIMIT(${limit})`,
        new Realm.BSON.ObjectId(conversationId),
        null,
        limit
      );
    },
    [conversationId, limit]
  );

  const fetchMoreMessages = () => {
    setLimit((prev) => prev + SIZE);
  };

  const hasMore = messages.length < totalMessageCount.length;

  return (
    <div
      id="scrollableDiv"
      style={{
        height: 300,
        overflow: "auto",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        backgroundColor: "#efeae2",
      }}
    >
      <InfiniteScroll
        dataLength={messages.length}
        next={fetchMoreMessages}
        style={{ display: "flex", flexDirection: "column-reverse" }}
        inverse={true}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        scrollableTarget="scrollableDiv"
        scrollThreshold={0.6}
      >
        {messages.map((msg) => {
          if (msg.type === "text") {
            return <MessageText msg={msg} key={msg._id as any} />;
          } else if (msg.type === "image") {
            return <MessageImage msg={msg} key={msg._id as any} />;
          } else if (msg.type === "interactive" && msg.interactive) {
            return <MessageInteractive msg={msg} key={msg._id as any} />;
          } else if (
            msg.type === "interactive_reply" &&
            msg.interactive_reply
          ) {
            return <MessageInteractiveReply msg={msg} key={msg._id as any} />;
          } else if (msg.type === "system") {
            return <MessageSystem msg={msg} key={msg._id as any} />;
          } else {
            return <MessageUnknown msg={msg} key={msg._id as any} />;
          }
        })}
      </InfiniteScroll>
    </div>
  );
}
