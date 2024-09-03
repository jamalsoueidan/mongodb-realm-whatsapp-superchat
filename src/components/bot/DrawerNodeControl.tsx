/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ActionIcon,
  Card,
  Divider,
  Drawer,
  Flex,
  ScrollArea,
  Title,
} from "@mantine/core";
import { useReactFlow } from "@xyflow/react";
import { Link, useRoute } from "wouter";
import { useMobile } from "../../hooks/useMobile";

import { IconX } from "@tabler/icons-react";
import { InteractiveButtonsControls } from "./nodes/interactive-buttons/InteractiveButtonsControls";
import { InteractiveListControls } from "./nodes/interactive-list/InteractiveListControls";
import { MessageControls } from "./nodes/message/MessageControls";
import { StartControls } from "./nodes/start/StartControls";

const controlTypes: Record<string, any> = {
  "interactive-list": InteractiveListControls,
  "interactive-buttons": InteractiveButtonsControls,
  message: MessageControls,
  start: StartControls,
};

export const DrawerNodeControl = () => {
  const isMobile = useMobile();
  const [isMatch, params] = useRoute<{
    flowId: string;
    id: string;
    section: "replace" | "controls";
  }>(":flowId/:section/:id");

  const { getNode } = useReactFlow();

  const node = getNode(params?.id || "");

  if (!node || params?.section !== "controls") {
    return null;
  }

  const Component = controlTypes[node.type || ""];

  return (
    <Drawer.Root
      position="right"
      size={isMobile ? "100%" : "30%"}
      opened={isMatch}
      onClose={() => {}}
      scrollAreaComponent={ScrollArea.Autosize}
    >
      <Drawer.Content>
        <Drawer.Body p="0">
          <Flex
            h="60px"
            w="100%"
            align="center"
            justify="space-between"
            px="sm"
          >
            <Title order={3}>{node.type}</Title>
            <ActionIcon
              component={Link}
              to={`/${params.flowId}`}
              variant="transparent"
              color="black"
            >
              <IconX />
            </ActionIcon>
          </Flex>
          <Divider />

          <Card>
            {Component ? (
              <Component {...(node as any)} />
            ) : (
              <Title order={5}>No controls for this node</Title>
            )}
          </Card>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
};
