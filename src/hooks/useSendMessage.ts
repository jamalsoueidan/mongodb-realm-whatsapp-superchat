import { useRealm, useUser } from "@realm/react";
import Realm from "realm";
import { useParams } from "wouter";
import { User } from "../models/data";
import { useGetConversation } from "./useGetConversation";

export const useSendMessage = () => {
  const { conversationId } = useParams<{ conversationId: string }>();
  const user = useUser();
  const conversation = useGetConversation(conversationId);
  const realm = useRealm();

  const sendText = (body: string) => {
    realm.write(() => {
      realm.create("Message", {
        _id: new Realm.BSON.ObjectId(),
        message_id: "not_send_yet",
        conversation,
        business_phone_number_id: "364826260050460",
        recipient: conversation.customer_phone_number,
        timestamp: Math.floor(Date.now() / 1000),
        statuses: [],
        type: "text",
        text: {
          preview_url: true,
          body,
        },
        user: realm.objectForPrimaryKey<User>(
          "User",
          new Realm.BSON.ObjectId((user.customData as any)._id)
        ),
      });
    });
  };

  const sendFlow = (rest: object) => {
    realm.write(() => {
      realm.create("Message", {
        _id: new Realm.BSON.ObjectId(),
        message_id: "not_send_yet",
        conversation,
        business_phone_number_id: "364826260050460",
        recipient: conversation.customer_phone_number,
        timestamp: Math.floor(Date.now() / 1000),
        statuses: [],
        type: "interactive",
        user: realm.objectForPrimaryKey<User>(
          "User",
          new Realm.BSON.ObjectId((user.customData as any)._id)
        ),
        ...rest,
      });
    });
  };

  return { sendText, sendFlow };
};
