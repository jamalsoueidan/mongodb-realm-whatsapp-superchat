import { useQuery } from "@realm/react";
import { useState } from "react";
import Realm from "realm";
import { Message, MessageSchema } from "../models/data";

export function useMessages({ conversationId }: { conversationId: string }) {
  const [limit, setLimit] = useState(10);
  const messages = useQuery<Message>(
    MessageSchema.name,
    (collection) =>
      collection.filtered(
        `conversation._id = $0 AND hidden == $1 SORT(timestamp ASC)`, //SORT(timestamp DESC) LIMIT(${limit}) SORT(timestamp ASC)
        new Realm.BSON.ObjectId(conversationId),
        null
      ),
    [limit, conversationId]
  );

  const showMore = () => {
    setLimit((value) => value + 5);
  };

  return {
    messages,
    showMore,
  };
}
