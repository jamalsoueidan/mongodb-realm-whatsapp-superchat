import { rem, Stack, Text } from "@mantine/core";
import { Edge, Node, NodeProps, Position } from "reactflow";

import { CustomHandle } from "../handlers/CustomHandle";
import { NodeTypes } from "../NodeTypes";
import { NodeWrapper } from "./NodeWrapper";

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
    type: NodeTypes.PlusNode,
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
    type: NodeTypes.Message,
  });

  return { nodes, edges };
};

export const MessageNode = (props: NodeProps<Message>) => {
  const { data, sourcePosition, id } = props;
  return (
    <NodeWrapper {...props}>
      <Stack gap={rem(2)} mb="xl">
        <Text c="dimmed" fz="sm">
          {data.text.body}
        </Text>
        <CustomHandle
          type="source"
          position={sourcePosition || Position.Right}
          id={id}
        />
      </Stack>
    </NodeWrapper>
  );
};
