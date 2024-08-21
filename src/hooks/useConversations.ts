import { useQuery } from "@realm/react";
import {
  Conversation,
  ConversationSchema,
  User,
  UserSchema,
} from "../models/data";
import { useRealmUser } from "./useRealmUser";

export function useConversations() {
  const user = useRealmUser();

  const myUser = useQuery<User>(
    UserSchema.name,
    (collection) => {
      return collection.filtered("user_id = $0", user?.id);
    },
    []
  );

  const conversations = useQuery<Conversation>(
    ConversationSchema.name,
    (collection) =>
      collection
        .filtered("hidden == false OR hidden == null")
        .sorted("timestamp", true),
    [myUser[0].updated_at]
  );

  return {
    conversations,
  };
}
