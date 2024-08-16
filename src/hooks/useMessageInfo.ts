import { Message } from "../models/data";

export function useMessageInfo(msg: Message) {
  const receivedDate = new Date(msg.timestamp * 1000);
  const isRecipientDifferent =
    msg.recipient !== msg.conversation?.customer_phone_number;

  return {
    receivedDate,
    isRecipientDifferent,
  };
}
