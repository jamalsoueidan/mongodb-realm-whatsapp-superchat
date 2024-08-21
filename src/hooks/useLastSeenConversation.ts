import { useQuery, useRealm } from "@realm/react";
import { useCallback } from "react";
import Realm from "realm";
import { useParams } from "wouter";
import { Conversation, UserConversation } from "../models/data";
import { useLoggedInUser } from "./useLoggedInUser";

/*
This is used to update the last seen at for the user conversation
We are using this method when user scrolls to the bottom of the chat
AND when user click on a conversation
*/
export function useLastSeenConversation(
  conversation: Conversation & Realm.Object<Conversation>
): [number, () => void] {
  const realm = useRealm();
  const user = useLoggedInUser();
  const { conversationId } = useParams<{ conversationId: string }>();

  const userConversation = useQuery<UserConversation>(
    "UserConversation",
    (collection) =>
      collection.filtered(
        "user == $0 AND conversation == $1",
        user,
        conversation
      ),
    [conversationId]
  );

  const lastSeenAt = userConversation[0] ? userConversation[0].last_seen_at : 0;

  const setLastSeenAt = useCallback(() => {
    if (!conversation || !user) return;
    const existingUserConversation = realm
      .objects<UserConversation>("UserConversation")
      .filtered("user == $0 && conversation == $1", user, conversation)[0];

    const _id = existingUserConversation?._id || new Realm.BSON.ObjectId();

    realm.write(() => {
      realm.create(
        "UserConversation",
        {
          _id,
          user,
          conversation,
          last_seen_at: Math.floor(Date.now() / 1000),
        },
        Realm.UpdateMode.Modified
      );
    });
  }, [conversation, realm, user]);

  return [lastSeenAt, setLastSeenAt];
}
