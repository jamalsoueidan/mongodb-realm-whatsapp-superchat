import { useUser } from "@realm/react";
import { Edge, Node } from "@xyflow/react";
import { useCallback } from "react";
import { BSON } from "realm";

export type BotLog = {
  _id: BSON.ObjectId;
  title: string;
  edges: Edge[];
  nodes: Node[];
  bot: BSON.ObjectId;
  status: "started" | "in progress" | "complete";
  completed_nodes: number;
  business_phone_number_id: string;
  customer_phone_number: string;
  current_node_id: string;
  conversation: {
    _id: BSON.ObjectId;
    name: string;
  };
  created_at: number;
  updated_at: number;
};

export const useBotLog = () => {
  const user = useUser();

  const load = useCallback(
    (props: Pick<BotLog, "_id" | "bot">) => {
      return user.functions["func-bot-log-get"]({
        _id: props._id.toString(),
        bot: props.bot.toString(),
        business_phone_number_id: "364826260050460",
      }).then((value: unknown) => {
        const bot = value as Array<BotLog>;
        return bot.length > 0 ? bot[0] : null;
      });
    },
    [user.functions]
  );

  return { load };
};
