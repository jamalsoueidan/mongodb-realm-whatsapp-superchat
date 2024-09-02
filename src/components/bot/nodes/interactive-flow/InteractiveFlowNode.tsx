import { rem, Stack, Text, Title } from "@mantine/core";
import { Node, NodeProps, Position } from "@xyflow/react";

import { CustomHandle } from "../../handlers/CustomHandler";
import { NodeWrapper } from "../../NodeWrapper";
import { InteractiveFlow } from "./InteractiveFlowType";

export type InteractiveFlowNode = Node<InteractiveFlow, "interactive-flow">;

export const InteractiveFlowNode = (props: NodeProps<InteractiveFlowNode>) => {
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
        <CustomHandle
          type="source"
          position={props.sourcePosition || Position.Right}
          id={props.id}
        />
      </Stack>
    </NodeWrapper>
  );
};
