import { Text, Title } from "@mantine/core";
import { Handle, NodeProps, Position } from "reactflow";
import { BoxWrapper } from "./BoxWrapper";

interface InteractiveButtons {
  type: string;
  interactive: {
    type: "button";
    header: {
      type: "text"; //can be image, and other type
      text: string;
    };
    body: {
      text: string;
    };
    footer: {
      text: string;
    };
    action: {
      buttons: [
        {
          type: "reply";
          reply: {
            id: string;
            title: string;
          };
        }
      ];
    };
  };
}

export const InteractiveButtons = ({
  data: { interactive },
  id,
}: NodeProps<InteractiveButtons>) => {
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
