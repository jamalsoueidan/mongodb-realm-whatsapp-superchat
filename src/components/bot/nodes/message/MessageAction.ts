import { Edge, Node } from "@xyflow/react";

import { CustomNodeTypes } from "../../CustomNodeTypes";
import { Message } from "./MessageType";

export const MessageDefault: Message = {
  type: "text",
  text: {
    preview_url: true,
    body: "asd",
  },
};

export const createMessageNode = (replace: Node) => {
  const { id, position } = replace;

  const nodes: CustomNodeTypes[] = [];
  const edges: Edge[] = [];

  const newComponent: Message = JSON.parse(JSON.stringify(MessageDefault));

  const selectNode: CustomNodeTypes = {
    id: new Realm.BSON.ObjectId().toString(),
    position: { x: 0, y: 0 },
    type: "plus",
    data: { name: "" },
  };
  nodes.push(selectNode);
  edges.push({
    id: `${id}-${selectNode.id}`,
    source: id,
    target: selectNode.id,
    type: "delete-edge",
    animated: true,
  });

  nodes.push({
    id,
    data: newComponent,
    position,
    type: "message",
  });

  return { nodes, edges };
};
