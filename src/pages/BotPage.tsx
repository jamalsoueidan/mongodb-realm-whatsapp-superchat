import { useCallback } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Connection,
  Controls,
  Edge,
  MiniMap,
  Panel,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "reactflow";

import { Divider, Flex, Title } from "@mantine/core";
import "reactflow/dist/style.css";
import { Route, Router, useLocation, useRoute } from "wouter";
import { initialEdges, initialNodes } from "../components/bot/defaultValues";
import { nodeTypes } from "../components/bot/NodeTypes";
import { NodeTypeSelectorModal } from "../components/bot/NodeTypeSelectorModal";
import { TriggerDrawer } from "../components/bot/TriggerDrawer";
import { useNodeAutoLayout } from "../components/bot/useNodeAutoLayout";
import { useMobile } from "../hooks/useMobile";

const Layout = () => {
  const [, setLocation] = useLocation();
  const [isMatch] = useRoute("/:id");
  const isMobile = useMobile();
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { triggerLayout } = useNodeAutoLayout();
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
        <Panel position="top-right">
          <button onClick={() => triggerLayout(true)}>Autolayout</button>
        </Panel>
        {!isMobile ? <MiniMap /> : null}
        <Controls />
        <Background />
      </ReactFlow>
    </Flex>
  );
};

export const BotPage = () => {
  return (
    <Router base="/bot">
      <ReactFlowProvider>
        <Route path="/:action?/:id?">
          <Layout />
        </Route>
        <TriggerDrawer />
        <NodeTypeSelectorModal />
      </ReactFlowProvider>
    </Router>
  );
};
