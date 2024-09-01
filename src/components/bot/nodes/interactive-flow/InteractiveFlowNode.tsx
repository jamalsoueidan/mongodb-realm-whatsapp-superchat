import { rem, Stack, Text, Title } from "@mantine/core";
import { Handle, NodeProps, Position } from "reactflow";

import { NodeWrapper } from "../../NodeWrapper";
import { InterctiveFlow } from "./InteractiveFlowAction";

export const InteractiveFlowNode = (props: NodeProps<InterctiveFlow>) => {
  const {
    data: { interactive },
  } = props;
  return (
    <NodeWrapper {...props}>
      <Stack gap={rem(2)} pos="relative" p="sm">
        <Title order={4}>{interactive.header.text}</Title>
        <Text fz="md">{interactive.body.text}</Text>
        <Text c="dimmed" fz="sm">
          {interactive.footer.text}
        </Text>
        <Handle
          type="source"
          position={props.sourcePosition || Position.Right}
          id={props.id}
        />
      </Stack>
    </NodeWrapper>
  );
};
