import { useUser } from "@realm/react";
import { useState } from "react";

export const useSendMessage = () => {
  const user = useUser();

  const [sendingMessages, setSendingMessages] = useState<number[]>([]);

  const send = (object?: any) => {
    const messageId = Math.random();
    setSendingMessages((prev) => [...prev, messageId]);

    user.functions["func-send-messages"]({
      business_phone_number_id: "364826260050460",
      ...object,
    }).finally(() => {
      setSendingMessages((prev) => prev.filter((msg) => msg !== messageId));
    });
  };

  return { send, count: sendingMessages.length };
};
