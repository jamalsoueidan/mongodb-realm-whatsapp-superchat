import { useQuery } from "@realm/react";
import { useEffect, useState } from "react";
import { Conversation, ConversationSchema } from "../models/data";

export function useConversations() {
  const [requeryFlag, setRequeryFlag] = useState(false); // Temporary flag

  const conversations = useQuery<Conversation>(
    ConversationSchema.name,
    (collection) =>
      collection
        .filtered("hidden == false OR hidden == null")
        .sorted("timestamp", true),
    [requeryFlag]
  );

  useEffect(() => {
    // (The value doesn't matter, only that it is different from the initial value.)
    setRequeryFlag(true);
  }, []);

  return {
    conversations,
  };
}
