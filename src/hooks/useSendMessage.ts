import { useRealm } from "@realm/react";
import Realm from "realm";
import { useParams } from "wouter";
import { useGetConversation } from "./useGetConversation";
import { useLoggedInUser } from "./useLoggedInUser";

export const useSendMessage = () => {
  const { conversationId } = useParams<{ conversationId: string }>();
  const user = useLoggedInUser();
  const conversation = useGetConversation(conversationId);
  const realm = useRealm();

  const sendText = (body: string) => {
    if (body.length === 0) return;

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
        user,
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
        user,
        ...rest,
      });
    });
  };

  return { sendText, sendFlow };
};
