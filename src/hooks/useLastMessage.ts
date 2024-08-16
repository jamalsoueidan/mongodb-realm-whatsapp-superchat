import { useQuery } from "@realm/react";
import { useEffect, useState } from "react";
import { Message, MessageSchema } from "../models/data";

export function useLastMessage({
  conversation,
}: {
  conversation: Realm.BSON.ObjectId;
}) {
  const [requeryFlag, setRequeryFlag] = useState(false);
  const message = useQuery<Message>(
    MessageSchema.name,
    (collection) =>
      collection.filtered(
        `conversation._id = $0 SORT(timestamp DESC) LIMIT(1) SORT(timestamp ASC)`,
        conversation
      ),
    [requeryFlag, conversation]
  );

  useEffect(() => {
    setRequeryFlag(true);
  }, []);

  return {
    timestamp:
      message.length > 0 ? message[0].timestamp : Math.floor(Date.now() / 1000),
  };
}
