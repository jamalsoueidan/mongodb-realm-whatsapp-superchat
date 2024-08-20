import { useQuery } from "@realm/react";
import Realm from "realm";
import { Conversation, Message, UserConversation } from "../models/data";
import { useRealmUser } from "./useRealmUser";

export const useUnreadMessageCount = (
  conversation: Conversation & Realm.Object<Conversation>
) => {
  const user = useRealmUser();

  const userConversation = useQuery<UserConversation>(
    "UserConversation",
    (collection) =>
      collection.filtered(
        "user._id == $0 AND conversation == $1",
        new Realm.BSON.ObjectId(user.customData._id),
        conversation
      ),
    [conversation]
  );

  const last_seen_at = userConversation[0]
    ? userConversation[0].last_seen_at
    : 0;

  const unreadMessageCount = useQuery<Message>(
    "Message",
    (collection) =>
      collection.filtered(
        "conversation == $0 AND recipient != $1 AND timestamp > $2",
        conversation,
        conversation.customer_phone_number,
        last_seen_at
      ),
    [conversation, last_seen_at]
  );

  return unreadMessageCount.length;
};
