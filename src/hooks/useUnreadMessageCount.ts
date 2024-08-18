import { useQuery, useUser } from "@realm/react";
import Realm from "realm";
import { Conversation, Message, UserConversation } from "../models/data";

export const useUnreadMessageCount = (
  conversation: Conversation & Realm.Object<Conversation>
) => {
  const user = useUser();

  const userConversation = useQuery<UserConversation>(
    "UserConversation",
    (collection) =>
      collection.filtered(
        "user._id == $0 && conversation == $1",
        new Realm.BSON.ObjectId((user.customData as any)._id),
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
        "conversation == $0 && timestamp > $1",
        conversation,
        last_seen_at
      ),
    [conversation, last_seen_at]
  );

  return unreadMessageCount.length;
};
