import { useQuery } from "@realm/react";
import { Conversation, ConversationSchema } from "../models/data";

export function useContacts(searchString: string) {
  const contacts = useQuery<Conversation>(
    ConversationSchema.name,
    (collection) =>
      collection
        .filtered("name CONTAINS[c] $0", searchString)
        .sorted("name", true),
    [searchString]
  );

  return contacts;
}
