import { useQuery } from "@realm/react";
import { Conversation, ConversationSchema } from "../models/data";

export function useConversations() {
  const conversations = useQuery<Conversation>(
    ConversationSchema.name,
    (collection) => collection.sorted("timestamp", true),
    []
  );

  return {
    conversations,
  };
}
