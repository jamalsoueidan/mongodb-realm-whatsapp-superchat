import { useQuery } from "@realm/react";
import { useEffect, useState } from "react";
import Realm from "realm";
import { Message, MessageSchema } from "../models/data";

export function useMessages({ conversationId }: { conversationId: string }) {
  const [requeryFlag, setRequeryFlag] = useState(false); // Temporary flag
  const [limit, setLimit] = useState(10);
  const messages = useQuery<Message>(
    MessageSchema.name,
    (collection) =>
      collection.filtered(
        `conversation._id = $0 SORT(timestamp ASC)`, //SORT(timestamp DESC) LIMIT(${limit}) SORT(timestamp ASC)
        new Realm.BSON.ObjectId(conversationId)
      ),
    [requeryFlag, limit, conversationId]
  );

  useEffect(() => {
    setRequeryFlag(true);
  }, []);

  const showMore = () => {
    setLimit((value) => value + 5);
  };

  return {
    messages,
    showMore,
  };
}
