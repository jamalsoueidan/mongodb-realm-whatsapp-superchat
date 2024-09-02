import { rem, Stack, Text } from "@mantine/core";
import { Handle, Node, NodeProps, Position } from "@xyflow/react";

import { NodeWrapper } from "../../NodeWrapper";
import { Message } from "./MessageType";

export type MessageNode = Node<Message, "message">;

export const MessageNode = (props: NodeProps<MessageNode>) => {
  const { data, id } = props;
  return (
    <NodeWrapper {...props}>
      <Stack gap={rem(2)} p="xs" pos="relative">
        <Text c="dimmed" fz="sm">
          {data.text.body}
        </Text>
        <Handle
          type="source"
          position={props.sourcePosition || Position.Right}
          id={id}
        />
      </Stack>
    </NodeWrapper>
  );
};
