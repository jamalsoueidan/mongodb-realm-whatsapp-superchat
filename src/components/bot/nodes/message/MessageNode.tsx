import { rem, Stack, Text } from "@mantine/core";
import {
  Handle,
  Node,
  NodeProps,
  Position,
  useHandleConnections,
} from "@xyflow/react";

import { NodeWrapper } from "../../NodeWrapper";
import { Message } from "./MessageType";

export type MessageNode = Node<Message, "message">;

export const MessageNode = (props: NodeProps<MessageNode>) => {
  const connections = useHandleConnections({ type: "source", id: props.id });
  const { data, id } = props;

  return (
    <NodeWrapper {...props}>
      <Stack gap={rem(2)} p="xs" pos="relative">
        <Text
          c="dimmed"
          fz="sm"
          style={{ whiteSpace: "pre-line" }}
          dangerouslySetInnerHTML={{
            __html: data.whatsapp.text.body.replace(/\n\n/g, "<br />"),
          }}
        />
        <Handle
          type="source"
          position={props.sourcePosition || Position.Right}
          id={id}
          isConnectable={connections.length === 0}
        />
      </Stack>
    </NodeWrapper>
  );
};
