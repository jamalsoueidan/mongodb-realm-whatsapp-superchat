import { Button, Divider, Flex, Title } from "@mantine/core";
import {
  addEdge,
  Background,
  Connection,
  Controls,
  Edge,
  MarkerType,
  MiniMap,
  NodeTypes,
  OnConnectStartParams,
  Panel,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useRef } from "react";
import Realm from "realm";
import { useLocation, useRoute } from "wouter";
import { useMobile } from "../../hooks/useMobile";
import { CustomEdgeTypes } from "./CustomEdgeTypes";
import { CustomNodeTypes } from "./CustomNodeTypes";
import { initialEdges, initialNodes } from "./defaultValues";
import { NodeAutoLayout } from "./NodeAutoLayout";
import { InteractiveButtonsNode } from "./nodes/interactive-buttons/InteractiveButtonsNode";
import { InteractiveFlowNode } from "./nodes/interactive-flow/InteractiveFlowNode";
import { InteractiveListNode } from "./nodes/interactive-list/InteractiveListNode";
import { MessageNode } from "./nodes/message/MessageNode";
import { PlusNode } from "./nodes/plus/PlusNode";
import { StartNode } from "./nodes/start/StartNode";

export const nodeTypes: NodeTypes = {
  "interactive-buttons": InteractiveButtonsNode,
  "interactive-list": InteractiveListNode,
  "interactive-flow": InteractiveFlowNode,
  message: MessageNode,
  plus: PlusNode,
  start: StartNode,
};

export const Flow = () => {
  const [, setLocation] = useLocation();
  const isMobile = useMobile();
  const [isMatch, params] = useRoute<{
    flowId: string;
    id: string;
    section: "replace" | "controls";
  }>(":flowId/:section/:id");
  const connectingNodeId = useRef<OnConnectStartParams | null>(null);
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const { screenToFlowPosition, setNodes, deleteElements } = useReactFlow();

  const onConnectStart = useCallback(
    (_: unknown, nodeAndHandle: OnConnectStartParams) => {
      connectingNodeId.current = nodeAndHandle;
    },
    []
  );

  const onConnectEnd = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (!connectingNodeId.current) return;

      const targetIsPane = (event.target as Element).classList.contains(
        "react-flow__pane"
      );

      if (targetIsPane) {
        let position = { x: 0, y: 0 };
        if (event instanceof MouseEvent) {
          position = { x: event.clientX, y: event.clientY };
        } else if (event instanceof TouchEvent) {
          position = {
            x: event.touches[0].clientX,
            y: event.touches[0].clientY,
          };
        }

        const id = new Realm.BSON.ObjectId().toString();
        const newNode: CustomNodeTypes = {
          id,
          position: screenToFlowPosition(position),
          data: { name: `Node ${id}` },
          type: "plus",
        };

        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) =>
          eds.concat({
            id,
            source: connectingNodeId.current?.nodeId || "",
            sourceHandle: connectingNodeId.current?.handleId || "",
            target: id,
            markerEnd: {
              type: MarkerType.ArrowClosed,
              width: 10,
              height: 10,
            },
            style: {
              strokeWidth: 2,
            },
            type: "delete-edge",
            animated: true,
          })
        );
      }
    },
    [screenToFlowPosition, setEdges, setNodes]
  );

  const onEdgesDelete = (deletedEdges: Edge[]) => {
    deletedEdges.forEach((edge) => {
      const node = nodes.find(
        (node) => node.id === edge.target && node.type === "plus"
      );

      if (node && node.type) {
        const totalEdges = edges.filter((e) => e.target === node.id).length;
        if (totalEdges === 1) {
          deleteElements({ nodes: [node] });
        }
      }
    });
  };

  console.log(params);
  const onPaneClick = () => {
    if (!isMobile && params?.section) {
      //onMobile we have a close button
      setLocation(`/${params?.flowId}`);
    }
  };

  const onConnect = useCallback(
    (params: Connection) => {
      connectingNodeId.current = null;

      setEdges((edge: Array<Edge>) =>
        addEdge(
          {
            ...params,
            markerEnd: {
              type: MarkerType.ArrowClosed,
              width: 10,
              height: 10,
            },
            type: "delete-edge",
            animated: true,
          },
          edge
        )
      );
    },
    [setEdges]
  );

  return (
    <Flex
      direction="column"
      w={
        isMatch && !isMobile && params.section === "controls"
          ? "calc(70% - 70px)"
          : "100%"
      }
      h="100%"
    >
      <Flex p="md" h="60px" justify="space-between" align="center" gap="xs">
        <Title order={3}>Bot</Title>
      </Flex>
      <Divider />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onEdgesDelete={onEdgesDelete}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        elementsSelectable={true}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        edgeTypes={CustomEdgeTypes}
        fitView
      >
        <NodeAutoLayout />
        <Panel position="top-center">
          <Button onClick={() => console.log(JSON.stringify(nodes))}>
            print
          </Button>
        </Panel>
        {!isMobile ? <MiniMap /> : null}
        <Controls />
        <Background />
      </ReactFlow>
    </Flex>
  );
};
