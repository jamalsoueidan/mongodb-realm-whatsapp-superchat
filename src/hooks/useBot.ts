import { useUser } from "@realm/react";
import { Edge, Node } from "@xyflow/react";
import { useCallback } from "react";
import { BSON } from "realm";

export type Bot = {
  _id: BSON.ObjectId;
  user: string;
  title: string;
  edges: Edge[];
  nodes: Node[];
  status: "draft" | "published";
  business_phone_number_id: string;
  created_at: number;
  updated_at: number;
};

export const useBot = () => {
  const user = useUser();

  const load = useCallback(
    (props: Pick<Bot, "_id">) => {
      return user.functions["func-bot-get"]({
        _id: props._id.toString(),
        business_phone_number_id: "364826260050460",
      }).then((value: unknown) => {
        const bot = value as Bot;
        return bot;
      });
    },
    [user.functions]
  );

  const create = useCallback(
    (
      props: Omit<
        Bot,
        | "business_phone_number_id"
        | "_id"
        | "created_at"
        | "updated_at"
        | "user"
      >
    ) => {
      return user.functions["func-bot-create"]({
        ...props,
        business_phone_number_id: "364826260050460",
      }).then((value: unknown) => {
        const bot = value as Bot;
        return bot;
      });
    },
    [user.functions]
  );

  const update = useCallback(
    (props: Pick<Bot, "_id"> & Partial<Omit<Bot, "_id">>) => {
      return user.functions["func-bot-update"]({
        ...props,
        _id: props._id.toString(), //we must converted it to string!
        business_phone_number_id: "364826260050460",
      }).then((value: unknown) => {
        const bot = value;
        return bot;
      });
    },
    [user.functions]
  );

  return { create, update, load };
};
