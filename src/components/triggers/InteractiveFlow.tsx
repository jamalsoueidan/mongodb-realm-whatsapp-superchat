import { Text, Title } from "@mantine/core";
import { NodeProps } from "reactflow";
import { withTrigger } from "./withTrigger";

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

export const InteractiveFlow = withTrigger(
  ({ data: { interactive } }: NodeProps<InterctiveFlow>) => {
    return (
      <>
        <Title order={4}>{interactive.header.text}</Title>
        <Text fz="md">{interactive.body.text}</Text>
        <Text c="dimmed" fz="sm">
          {interactive.footer.text}
        </Text>
      </>
    );
  }
);
