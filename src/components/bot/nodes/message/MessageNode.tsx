import { rem, Stack, Text } from "@mantine/core";
import { Handle, NodeProps, Position } from "reactflow";

import { NodeWrapper } from "../../NodeWrapper";
import { Message } from "./MessageAction";

export const MessageNode = (props: NodeProps<Message>) => {
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
