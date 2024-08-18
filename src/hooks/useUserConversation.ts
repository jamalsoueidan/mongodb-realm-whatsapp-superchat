import { useRealm, useUser } from "@realm/react";
import { startTransition, useEffect } from "react";
import Realm from "realm";
import { Conversation, User, UserConversation } from "../models/data";

export function useUserConversation(conversationId: string) {
  const realm = useRealm();
  const user = useUser();

  useEffect(() => {
    if (!conversationId || !user) return;

    startTransition(() => {
      const existingUserConversation = realm
        .objects<UserConversation>("UserConversation")
        .filtered(
          "user._id == $0 && conversation._id == $1",
          new Realm.BSON.ObjectId((user.customData as any)._id),
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
              new Realm.BSON.ObjectId((user.customData as any)._id)
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
    });
  }, [conversationId, realm, user]);
}
