import { ComponentType, useCallback } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Connection,
  Controls,
  Edge,
  MiniMap,
  NodeProps,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "reactflow";

import { Divider, Flex, Title } from "@mantine/core";
import "reactflow/dist/style.css";
import { Router, useLocation, useRoute } from "wouter";
import {
  initialEdges,
  initialNodes,
  NodeTypes,
} from "../components/triggers/defaultValues";
import { InteractiveButtons } from "../components/triggers/InteractiveButtons";
import { InteractiveFlow } from "../components/triggers/InteractiveFlow";
import { InteractiveList } from "../components/triggers/InteractiveList";
import { PlusNode } from "../components/triggers/PlusNode";
import { SelectNode } from "../components/triggers/SelectNode";
import { TriggerDrawer } from "../components/triggers/TriggerDrawer";
import { TriggerModal } from "../components/triggers/TriggerModal";
import { useTriggerPosition } from "../components/triggers/useTriggerPosition";
import { useMobile } from "../hooks/useMobile";

export const nodeTypes: Record<NodeTypes, ComponentType<NodeProps>> = {
  [NodeTypes.InteractiveList]: InteractiveList,
  [NodeTypes.InteractiveFlow]: InteractiveFlow,
  [NodeTypes.InteractiveButtons]: InteractiveButtons,
  [NodeTypes.SelectNode]: SelectNode,
  [NodeTypes.PlusNode]: PlusNode,
};

const LayoutFlow = () => {
  const [, setLocation] = useLocation();
  const [isMatch] = useRoute("/:id");
  const isMobile = useMobile();
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  useTriggerPosition();

  /*const onNodeClick = (_: unknown, node: Node<unknown>) => {
    if (!isMobile) {
      //onMobile we add a button to edit nodes
      setLocation(`/${node.id}`);
    }
  };*/

  const onPaneClick = () => {
    if (!isMobile) {
      //onMobile we have a close button
      setLocation(`/`);
    }
  };

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((edge: Array<Edge<unknown>>) => addEdge(params, edge)),
    [setEdges]
  );

  return (
    <Flex
      direction="column"
      w={isMatch && !isMobile ? "calc(70% - 70px)" : "100%"}
      h="100%"
    >
      <Flex p="md" h="60px" justify="space-between" align="center" gap="xs">
        <Title order={3}>Trigger</Title>
      </Flex>
      <Divider />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        elementsSelectable={true}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </Flex>
  );
};

export const TriggerPage = () => {
  return (
    <Router base="/trigger">
      <ReactFlowProvider>
        <LayoutFlow />
        <TriggerDrawer />
        <TriggerModal />
      </ReactFlowProvider>
    </Router>
  );
};
