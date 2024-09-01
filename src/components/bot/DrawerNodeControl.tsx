/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Divider, Drawer, Flex, ScrollArea, Title } from "@mantine/core";
import { ComponentType, useEffect } from "react";
import { NodeProps, useReactFlow } from "reactflow";
import "reactflow/dist/style.css";
import { Redirect, useRoute } from "wouter";
import { useMobile } from "../../hooks/useMobile";

import { NodeEnumTypes } from "./NodeEnumTypes";
import { InteractiveListControls } from "./nodes/interactive-list/InteractiveListControls";

const controlTypes: Record<NodeEnumTypes, ComponentType<NodeProps>> = {
  [NodeEnumTypes.InteractiveList]: InteractiveListControls,
  [NodeEnumTypes.InteractiveFlow]: InteractiveListControls,
  [NodeEnumTypes.InteractiveButtons]: InteractiveListControls,
  [NodeEnumTypes.Message]: InteractiveListControls,
  [NodeEnumTypes.StartNode]: InteractiveListControls,
  [NodeEnumTypes.PlusNode]: InteractiveListControls,
};

export const DrawerNodeControl = () => {
  const isMobile = useMobile();
  const [isMatch, params] = useRoute<{ id: string }>("/controls/:id");

  const { getNode, fitView } = useReactFlow();

  const node = getNode(params?.id || "");

  useEffect(() => {
    fitView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!node) {
    return <Redirect to="/" />;
  }

  const Component = controlTypes[NodeEnumTypes.InteractiveList];

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
