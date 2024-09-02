import { Divider, Flex, Title } from "@mantine/core";
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
import { CustomNodeTypes } from "./CustomNodeTypes";
import { initialEdges, initialNodes } from "./defaultValues";
import { EdgeTypes } from "./EdgeTypes";
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
  const [isMatch] = useRoute("/controls/:id");
  const connectingNodeId = useRef<string | null>(null);
  const isMobile = useMobile();
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const { screenToFlowPosition, setNodes } = useReactFlow();

  const onConnectStart = useCallback(
    (_: unknown, { nodeId, handleId, handleType }: OnConnectStartParams) => {
      console.log(nodeId, handleId, handleType);
      connectingNodeId.current = nodeId;
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
          origin: [0.5, 0.0],
          type: "plus",
        };

        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) =>
          eds.concat({
            id,
            source: connectingNodeId.current || "",
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

  const onPaneClick = () => {
    if (!isMobile) {
      //onMobile we have a close button
      setLocation(`/`);
    }
  };

  const onConnect = useCallback(
    (params: Connection) => {
      connectingNodeId.current = null;
      console.log(params);
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
      w={isMatch && !isMobile ? "calc(70% - 70px)" : "100%"}
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
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        elementsSelectable={true}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        edgeTypes={EdgeTypes}
        fitView
      >
        <NodeAutoLayout />
        {!isMobile ? <MiniMap /> : null}
        <Controls />
        <Background />
      </ReactFlow>
    </Flex>
  );
};
