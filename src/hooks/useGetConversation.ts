import { useQuery } from "@realm/react";
import Realm from "realm";
import { Conversation, ConversationSchema } from "../models/data";

export function useGetConversation(conversationId?: string) {
  const conversations = useQuery<Conversation>(
    ConversationSchema.name,
    (collection) =>
      collection.filtered(
        `_id = $0 LIMIT(1)`,
        new Realm.BSON.ObjectId(conversationId)
      ),
    [conversationId]
  );

  return conversations[0];
}
