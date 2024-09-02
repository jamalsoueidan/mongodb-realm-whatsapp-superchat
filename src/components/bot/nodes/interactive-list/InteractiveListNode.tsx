import { Box, Button, Divider, rem, Stack, Text } from "@mantine/core";
import { IconMenu2 } from "@tabler/icons-react";
import { Handle, Node, NodeProps, Position } from "@xyflow/react";

import { NodeWrapper } from "../../NodeWrapper";
import { InteractiveList } from "./InteractiveListType";

export type InteractiveListNode = Node<InteractiveList, "interactive-list">;

export const InteractiveListNode = (props: NodeProps<InteractiveListNode>) => {
  const {
    data: { interactive },
    sourcePosition,
  } = props;

  return (
    <NodeWrapper {...props}>
      <Stack gap={rem(2)} pos="relative" p="xs">
        <Text fw="bold">{interactive.header.text}</Text>
        <Text>{interactive.body.text}</Text>
        <Text c="dimmed" fz="sm">
          {interactive.footer.text}
        </Text>
        <Button variant="outline" leftSection={<IconMenu2 />} color="gray.6">
          {interactive.action.button}
        </Button>
      </Stack>

      {interactive.action.sections.map((section) => {
        return (
          <Stack key={section.title} gap={rem(2)} mb="xs">
            <Text c="dimmed" fz="sm" fw="bold" px="xs">
              {section.title}
            </Text>
            <Divider />
            <Stack pt="xs" gap={rem(3)}>
              {section.rows.map((row) => {
                return (
                  <Box pos="relative" key={row.id} px="xs">
                    <Button
                      variant="outline"
                      size="compact-sm"
                      c="blue"
                      color="gray.4"
                      fullWidth
                    >
                      {row.title}
                    </Button>
                    <Handle
                      type="source"
                      position={sourcePosition || Position.Right}
                      id={row.id}
                    />
                  </Box>
                );
              })}
            </Stack>
          </Stack>
        );
      })}
    </NodeWrapper>
  );
};