import { Box, Button, rem, Stack, Text } from "@mantine/core";
import { Handle, NodeProps, Position } from "reactflow";
import { CustomHandle } from "../handlers/CustomHandle";
import { NodeWrapper } from "./NodeWrapper";

export type InteractiveButtons = {
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
      buttons: Array<{
        type: "reply";
        reply: {
          id: string;
          title: string;
        };
      }>;
    };
  };
};

export const InteractiveButtonsNode = (
  props: NodeProps<InteractiveButtons>
) => {
  const {
    data: { interactive },
  } = props;

  return (
    <NodeWrapper {...props}>
      <Box p="sm" pos="relative">
        <Text fw="bold">{interactive.header.text}</Text>
        <Text>{interactive.body.text}</Text>
        <Text c="dimmed" fz="sm">
          {interactive.footer.text}
        </Text>

        <Handle
          type="target"
          position={props.targetPosition || Position.Top}
          id={props.id}
          style={{ width: rem(10), height: rem(10) }}
        />
      </Box>
      <Stack gap={rem(4)} my="sm">
        {interactive.action.buttons.map((button) => {
          return (
            <Box pos="relative" key={button.reply.id} px="sm">
              <Button variant="outline" key={button.reply.id} w="100%">
                {button.reply.id}
              </Button>
              <CustomHandle
                type="source"
                position={props.sourcePosition || Position.Right}
                id={button.reply.id}
              />
            </Box>
          );
        })}
      </Stack>
    </NodeWrapper>
  );
};
