import { Text, Title } from "@mantine/core";
import { Handle, NodeProps, Position } from "reactflow";
import { BoxWrapper } from "./BoxWrapper";

interface InterctiveFlow {
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
}

export const InteractiveFlow = ({
  data: { interactive },
  id,
}: NodeProps<InterctiveFlow>) => {
  return (
    <BoxWrapper id={id}>
      <Title order={4}>{interactive.header.text}</Title>
      <Text fz="md">{interactive.body.text}</Text>
      <Text c="dimmed" fz="sm">
        {interactive.footer.text}
      </Text>
      <Handle type="target" position={Position.Left} />
    </BoxWrapper>
  );
};
