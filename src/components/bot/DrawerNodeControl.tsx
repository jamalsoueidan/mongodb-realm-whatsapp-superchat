/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Divider, Drawer, Flex, ScrollArea, Title } from "@mantine/core";
import { useReactFlow } from "@xyflow/react";
import { Redirect, useRoute } from "wouter";
import { useMobile } from "../../hooks/useMobile";

import { InteractiveButtonsControls } from "./nodes/interactive-buttons/InteractiveButtonsControls";
import { InteractiveListControls } from "./nodes/interactive-list/InteractiveListControls";
import { MessageControls } from "./nodes/message/MessageControls";

const controlTypes: Record<string, any> = {
  "interactive-list": InteractiveListControls,
  "interactive-buttons": InteractiveButtonsControls,
  message: MessageControls,
};

export const DrawerNodeControl = () => {
  const isMobile = useMobile();
  const [isMatch, params] = useRoute<{ id: string }>("/controls/:id");

  const { getNode } = useReactFlow();

  const node = getNode(params?.id || "");

  if (!node) {
    return <Redirect to="/" />;
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
          <Flex h="60px" w="100%" align="center" px="sm">
            <Title order={3}>{node.type}</Title>
          </Flex>
          <Divider />

          <Card>
            <Component {...(node as any)} />
          </Card>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
};
