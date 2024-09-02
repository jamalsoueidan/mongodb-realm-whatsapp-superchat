import { Box, Button, rem, Stack, Text } from "@mantine/core";
import { Handle, Node, NodeProps, Position } from "@xyflow/react";

import { NodeWrapper } from "../../NodeWrapper";
import { InteractiveButtons } from "./InteractiveButtonsType";

export type InteractiveButtonsNode = Node<
  InteractiveButtons,
  "interactive-buttons"
>;

export const InteractiveButtonsNode = (
  props: NodeProps<InteractiveButtonsNode>
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
      </Box>
      <Stack gap={rem(4)} my="sm">
        {interactive.action.buttons.map((button) => {
          return (
            <Box pos="relative" key={button.reply.id} px="sm">
              <Button variant="outline" key={button.reply.id} w="100%">
                {button.reply.title}
              </Button>
              <Handle
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