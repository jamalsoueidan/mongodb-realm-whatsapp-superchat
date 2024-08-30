import { ComponentType, useCallback } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Connection,
  Controls,
  Edge,
  MiniMap,
  Node,
  NodeProps,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "reactflow";

import { ActionIcon, Divider, Flex, Title } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import "reactflow/dist/style.css";
import { Route, Router, useLocation, useRoute } from "wouter";
import {
  initialEdges,
  initialNodes,
  NodeTypes,
} from "../components/triggers/defaultValues";
import { InteractiveButtons } from "../components/triggers/InteractiveButtons";
import { InteractiveFlow } from "../components/triggers/InteractiveFlow";
import { InteractiveList } from "../components/triggers/InteractiveList";
import { SelectTrigger } from "../components/triggers/SelectTrigger";
import { TriggerDrawer } from "../components/triggers/TriggerDrawer";
import { useTriggerPosition } from "../components/triggers/useTriggerPosition";
import { useMobile } from "../hooks/useMobile";

export const nodeTypes: Record<NodeTypes, ComponentType<NodeProps>> = {
  [NodeTypes.InteractiveList]: InteractiveList,
  [NodeTypes.InteractiveFlow]: InteractiveFlow,
  [NodeTypes.InteractiveButtons]: InteractiveButtons,
  [NodeTypes.SelectTrigger]: SelectTrigger,
};

const LayoutFlow = () => {
  const [, setLocation] = useLocation();
  const [isMatch] = useRoute("/trigger/controls/:id");
  const isMobile = useMobile();
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  useTriggerPosition();

  const onNodeClick = (_: unknown, node: Node<unknown>) => {
    if (!isMobile) {
      setLocation(`/trigger/controls/${node.id}`);
    }
  };

  const onPaneClick = () => {
    if (!isMobile) {
      setLocation(`/trigger/controls/`);
    }
  };

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((edge: Array<Edge<unknown>>) => addEdge(params, edge)),
    [setEdges]
  );

  return (
    <Flex direction="column" w={isMatch ? "calc(70% - 70px)" : "100%"} h="100%">
      <Flex p="md" h="60px" justify="space-between" align="center" gap="xs">
        <Title order={3}>Trigger</Title>
        {isMobile ? (
          <ActionIcon
            onClick={() =>
              setLocation(isMatch ? "/trigger" : "/trigger/controls")
            }
            variant="transparent"
            color="#666"
            size="lg"
          >
            <IconArrowRight
              stroke="1.5"
              style={{ width: "100%", height: "100%" }}
            />
          </ActionIcon>
        ) : null}
      </Flex>
      <Divider />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        elementsSelectable={true}
        onNodeClick={onNodeClick}
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
        <Route path="/:controls?/:id?">
          <LayoutFlow />
        </Route>
        <TriggerDrawer />
      </ReactFlowProvider>
    </Router>
  );
};
