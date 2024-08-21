import { useQuery } from "@realm/react";
import Realm from "realm";
import { Conversation, Message } from "../models/data";
import { useLastSeenConversation } from "./useLastSeenConversation";
import { useRealmUser } from "./useRealmUser";

export const useCountUnreadMessages = (
  conversation: Conversation & Realm.Object<Conversation>
) => {
  const user = useRealmUser();
  const [lastSeenAt] = useLastSeenConversation(conversation);

  const unreadMessageCount = useQuery<Message>(
    "Message",
    (collection) =>
      collection.filtered(
        "conversation == $0 AND user._id != $1 AND timestamp > $2",
        conversation,
        new Realm.BSON.ObjectId(user.customData._id),
        lastSeenAt
      ),
    [conversation, lastSeenAt]
  );

  return unreadMessageCount.length;
};
