import { useQuery } from "@realm/react";
import { useEffect, useState } from "react";
import { Conversation, ConversationSchema } from "../models/data";

export function useConversations() {
  const [requeryFlag, setRequeryFlag] = useState(false); // Temporary flag

  const conversations = useQuery<Conversation>(
    ConversationSchema.name,
    (collection) => collection.sorted("timestamp", true),
    [requeryFlag]
  );

  useEffect(() => {
    // Temporary solution for making `useQuery` update the `tasks` reference.
    // (The value doesn't matter, only that it is different from the initial value.)
    setRequeryFlag(true);
  }, []);

  return {
    conversations,
  };
}
