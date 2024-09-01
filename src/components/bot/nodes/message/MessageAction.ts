import { Edge, Node } from "reactflow";
import { NodeEnumTypes } from "../../NodeEnumTypes";

export type Message = {
  type: "text";
  text: {
    preview_url: boolean;
    body: string;
  };
};

export const MessageDefault: Message = {
  type: "text",
  text: {
    preview_url: true,
    body: "asd",
  },
};

export const createMessageNode = (replace: Node) => {
  const { id, position } = replace;

  const nodes: Node[] = [];
  const edges: Edge[] = [];

  const newComponent: Message = JSON.parse(JSON.stringify(MessageDefault));

  const selectNode: Node = {
    id: new Realm.BSON.ObjectId().toString(),
    position: { x: 0, y: 0 },
    type: NodeEnumTypes.PlusNode,
    data: { name: "" },
  };
  nodes.push(selectNode);
  edges.push({
    id: `${id}-${selectNode.id}`,
    source: id,
    target: selectNode.id,
  });

  nodes.push({
    id,
    data: newComponent,
    position,
    type: NodeEnumTypes.Message,
  });

  return { nodes, edges };
};
