import { Button } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";
import { Node } from "reactflow";

const Components = [
  {
    type: "interactive",
    interactive: {
      type: "list",
      header: {
        type: "text",
        text: "Choose Shipping Option",
      },
      body: {
        text: "Which shipping option do you prefer?",
      },
      footer: {
        text: "Lucky Shrub: Your gateway to succulents™",
      },
      action: {
        button: "Shipping Options",
        sections: [
          {
            title: "I want it ASAP!",
            rows: [
              {
                id: "priority_express",
                title: "Priority Mail Express",
              },
              {
                id: "priority_mail",
                title: "Priority Mail",
              },
            ],
          },
        ],
      },
    },
  },
];

type Props = {
  setNodes: Dispatch<SetStateAction<Node<unknown, string | undefined>[]>>;
};

export function TriggerProvider({ setNodes }: Props) {
  const addOnclick = () => {
    setNodes((prev: Array<Node<unknown>>) => [
      ...prev,
      {
        id: new Realm.BSON.ObjectId().toString(),
        data: Components[0],
        position: { x: 400, y: 500 },
        type: "interactive-list",
      },
    ]);
  };

  return <Button onClick={addOnclick}>Add</Button>;
}
