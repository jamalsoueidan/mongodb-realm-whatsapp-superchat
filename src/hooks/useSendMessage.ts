import { useRealm } from "@realm/react";
import { useCallback } from "react";
import { BSON } from "realm";
import { useParams } from "wouter";
import { useGetConversation } from "./useGetConversation";
import { useLoggedInUser } from "./useLoggedInUser";

export const useSendMessage = () => {
  const { conversationId } = useParams<{ conversationId: string }>();
  const user = useLoggedInUser();
  const conversation = useGetConversation(conversationId);
  const realm = useRealm();
  const timestamp = Math.floor(Date.now() / 1000);

  const sendInternalMessage = useCallback(
    (body: string) => {
      realm.write(() => {
        realm.create("Message", {
          _id: new BSON.ObjectId(),
          message_id: "system",
          type: "internal_message",
          conversation,
          business_phone_number_id: "364826260050460",
          recipient: conversation.customer_phone_number,
          timestamp,
          statuses: [],
          text: {
            body,
          },
          user,
        });
      });
    },
    [conversation, realm, timestamp, user]
  );

  const sendText = useCallback(
    (body: string) => {
      realm.write(() => {
        realm.create("Message", {
          _id: new BSON.ObjectId(),
          message_id: "not_send_yet",
          type: "text",
          conversation,
          business_phone_number_id: "364826260050460",
          recipient: conversation.customer_phone_number,
          timestamp,
          statuses: [],
          text: {
            preview_url: true,
            body,
          },
          user,
        });
      });
    },
    [conversation, realm, timestamp, user]
  );

  const sendFlow = useCallback(
    (rest: object) => {
      realm.write(() => {
        realm.create("Message", {
          _id: new BSON.ObjectId(),
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
    },
    [conversation, realm, user]
  );

  return { sendText, sendFlow, sendInternalMessage, conversation };
};
