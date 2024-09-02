import { Edge, Node } from "@xyflow/react";

import { CustomNodeTypes } from "../../CustomNodeTypes";
import { InteractiveButtons } from "./InteractiveButtonsType";

export const InteractiveButtonsDefault: InteractiveButtons = {
  type: "interactive",
  interactive: {
    type: "button",
    header: {
      type: "text",
      text: "Title",
    },
    body: {
      text: "Body",
    },
    footer: {
      text: "Footer",
    },
    action: {
      buttons: [
        {
          type: "reply",
          reply: {
            id: "1",
            title: "Button",
          },
        },
      ],
    },
  },
};

export const createInteractiveButtonNode = (replace: Node) => {
  const { id, position } = replace;

  const nodes: CustomNodeTypes[] = [];
  const edges: Edge[] = [];

  const newComponent: InteractiveButtons = JSON.parse(
    JSON.stringify(InteractiveButtonsDefault)
  );

  newComponent.interactive.action.buttons =
    newComponent.interactive.action.buttons.map((button) => {
      button.reply.id = new Realm.BSON.ObjectId().toString();
      const selectNode: CustomNodeTypes = {
        id: button.reply.id,
        position: { x: 0, y: 0 },
        type: "plus",
        data: { name: "" },
      };

      nodes.push(selectNode);
      edges.push({
        id: `${id}-${selectNode.id}`,
        source: id,
        sourceHandle: selectNode.id,
        target: selectNode.id,
        type: "delete-edge",
        animated: true,
      });

      return button;
    });

  nodes.push({
    id,
    data: newComponent,
    position,
    type: "interactive-buttons",
  });

  return { nodes, edges };
};