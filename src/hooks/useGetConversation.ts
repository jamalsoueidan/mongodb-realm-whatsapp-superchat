import { useRealm } from "@realm/react";
import Realm from "realm";
import { Conversation, ConversationSchema } from "../models/data";

export function useGetConversation(conversationId?: string) {
  const realm = useRealm();
  const conversation = realm.objectForPrimaryKey<Conversation>(
    ConversationSchema.name,
    new Realm.BSON.ObjectId(conversationId)
  );

  if (!conversation) {
    throw new Error("Conversation not found");
  }

  return conversation;
}
