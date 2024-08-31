import { rem, Stack, Text, Title } from "@mantine/core";
import { Handle, NodeProps, Position } from "reactflow";
import { NodeWrapper } from "./NodeWrapper";

export type InterctiveFlow = {
  type: string;
  interactive: {
    type: string;
    header: {
      type: string;
      text: string;
    };
    body: {
      text: string;
    };
    footer: {
      text: string;
    };
    action: {
      name: string;
      parameters: {
        flow_message_version: string;
        flow_token: string;
        flow_id: string;
        mode: string;
        flow_cta: string;
        flow_action: string;
        flow_action_payload: {
          screen: string;
        };
      };
    };
  };
};

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
          type="target"
          position={props.targetPosition || Position.Left}
          id={props.id}
        />
        <Handle
          type="source"
          position={props.sourcePosition || Position.Right}
          id={props.id}
        />
      </Stack>
    </NodeWrapper>
  );
};
