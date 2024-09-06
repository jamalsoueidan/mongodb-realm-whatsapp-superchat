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
import { NodeTypes, useReactFlow } from "@xyflow/react";
import { Link, useRoute } from "wouter";
import { useMobile } from "../../hooks/useMobile";

import { useDebouncedCallback } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";
import { useCallback } from "react";
import { BSON } from "realm";
import { useBot } from "../../hooks/useBot";
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

export const ControlDrawer = () => {
  const isMobile = useMobile();
  const [isMatch, params] = useRoute<{
    flowId: string;
    id: string;
  }>(":flowId/controls/:id");

  const { getNode, updateNodeData, getNodes, getEdges } = useReactFlow();
  const { update } = useBot();

  const saveData = useDebouncedCallback(() => {
    update({
      _id: new BSON.ObjectId(params?.flowId),
      nodes: getNodes(),
      edges: getEdges(),
      status: "draft",
    }).then(() => {
      console.log("save");
    });
  }, 800);

  const node = getNode(params?.id || "");

  const onValuesChange = useCallback(
    (values: Partial<NodeTypes["data"]>) => {
      if (params?.id) {
        updateNodeData(params?.id, values);
        saveData();
      }
    },
    [params?.id, saveData, updateNodeData]
  );

  if (!node || !params?.id || !params.flowId) {
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
              <Component
                node={node}
                onValuesChange={onValuesChange}
                key={node.id}
              />
            ) : (
              <Title order={5}>No controls for this node</Title>
            )}
          </Card>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
};
