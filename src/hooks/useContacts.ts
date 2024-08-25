import { useQuery } from "@realm/react";
import { useMemo } from "react";
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

  const groupedContacts = useMemo(() => {
    return contacts.reduce(
      (
        groups: Record<
          string,
          Array<Conversation & Realm.Object<Conversation>>
        >,
        contact
      ) => {
        const firstChar = contact.name ? contact.name[0].toUpperCase() : "#";

        if (!groups[firstChar]) {
          groups[firstChar] = [];
        }

        groups[firstChar].push(contact);
        return groups;
      },
      {}
    );
  }, [contacts]);

  return groupedContacts;
}
