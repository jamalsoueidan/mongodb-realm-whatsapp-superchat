import { useRealm } from "@realm/react";
import { useCallback } from "react";
import Realm from "realm";
import { useParams } from "wouter";
import { Conversation, User, UserConversation } from "../models/data";
import { useRealmUser } from "./useRealmUser";

/*
This is used to update the last seen at for the user conversation
We are using this method when user scrolls to the bottom of the chat
AND when user click on a conversation
*/
export function useUserConversation() {
  const realm = useRealm();
  const user = useRealmUser();
  const { conversationId } = useParams<{ conversationId: string }>();

  const updateLastSeenAt = useCallback(() => {
    if (!conversationId || !user) return;
    const existingUserConversation = realm
      .objects<UserConversation>("UserConversation")
      .filtered(
        "user._id == $0 && conversation._id == $1",
        new Realm.BSON.ObjectId(user.customData._id),
        new Realm.BSON.ObjectId(conversationId)
      )[0];

    const _id = existingUserConversation?._id || new Realm.BSON.ObjectId();

    realm.write(() => {
      realm.create(
        "UserConversation",
        {
          _id,
          user: realm.objectForPrimaryKey<User>(
            "User",
            new Realm.BSON.ObjectId(user.customData._id)
          ),
          conversation: realm.objectForPrimaryKey<Conversation>(
            "Conversation",
            new Realm.BSON.ObjectId(conversationId)
          ),
          last_seen_at: Math.floor(Date.now() / 1000),
        },
        Realm.UpdateMode.Modified
      );
    });
  }, [conversationId, realm, user]);

  return updateLastSeenAt; // Return the function so it can be called elsewhere
}
