import { rem, Stack, Text } from "@mantine/core";
import { Node, NodeProps, Position } from "@xyflow/react";

import { CustomHandle } from "../../handlers/CustomHandler";
import { NodeWrapper } from "../../NodeWrapper";
import { Message } from "./MessageType";

export type MessageNode = Node<Message, "message">;

export const MessageNode = (props: NodeProps<MessageNode>) => {
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
        <CustomHandle
          type="source"
          position={props.sourcePosition || Position.Right}
          id={id}
          multiHandlers={false}
        />
      </Stack>
    </NodeWrapper>
  );
};
