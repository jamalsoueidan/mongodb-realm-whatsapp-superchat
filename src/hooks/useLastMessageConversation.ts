import { useQuery } from "@realm/react";
import { Conversation, Message, MessageSchema } from "../models/data";

export function useLastMessageConversation(
  conversation: Conversation & Realm.Object<Conversation>
) {
  const message = useQuery<Message>(
    MessageSchema.name,
    (collection) =>
      collection.filtered(
        `conversation = $0 AND type != $1 SORT(timestamp DESC) LIMIT(1) SORT(timestamp ASC)`,
        conversation,
        "system"
      ),
    [conversation]
  );

  return message.length > 0 ? message[0] : null;
}
