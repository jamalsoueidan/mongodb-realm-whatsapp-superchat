import { usePrevious } from "@mantine/hooks";
import {
  addEdge,
  Background,
  Connection,
  Controls,
  Edge,
  getConnectedEdges,
  getIncomers,
  getOutgoers,
  MarkerType,
  Node,
  NodeTypes,
  OnConnectStartParams,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useEffect, useRef } from "react";
import { BSON } from "realm";
import { useRoute } from "wouter";
import { useBot } from "../../hooks/useBot";
import { CustomEdgeTypes } from "./CustomEdgeTypes";
import { CustomNodeTypes } from "./CustomNodeTypes";
import { FlowPanel } from "./FlowPanel";
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
  const [, params] = useRoute<{
    flowId: string;
    id: string;
    section: "replace" | "controls" | "logs";
  }>(":flowId/:section?/:id?");

  const connectingNodeId = useRef<OnConnectStartParams | null>(null);
  const [nodes, , onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const { load } = useBot();

  useEffect(() => {
    if (params?.flowId) {
      load({ _id: new BSON.ObjectId(params?.flowId) }).then((data) => {
        console.log(data);
        if (data) {
          setNodes(data.nodes);
          setEdges(data.edges);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { screenToFlowPosition, setNodes, deleteElements, fitBounds, fitView } =
    useReactFlow();

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

        const id = new BSON.ObjectId().toString();
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

  const onNodesDelete = useCallback(
    (deleted: Node[]) => {
      setEdges(
        deleted.reduce((acc, node) => {
          const incomers = getIncomers(node, nodes, edges);
          const outgoers = getOutgoers(node, nodes, edges);
          const connectedEdges = getConnectedEdges([node], edges);

          const remainingEdges = acc.filter(
            (edge) => !connectedEdges.includes(edge)
          );

          const createdEdges = incomers.flatMap(({ id: source }) =>
            outgoers.map(({ id: target }) => ({
              id: `${source}->${target}`,
              source,
              target,
            }))
          );

          return [...remainingEdges, ...createdEdges];
        }, edges)
      );
    },
    [nodes, edges]
  );

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

  const previous = usePrevious(params?.id);
  useEffect(() => {
    if (previous !== params?.id) {
      if (params?.id) {
        const node = nodes.find((n) => n.id === params.id);

        setTimeout(() => {
          if (node && node.measured?.width && node.measured?.height) {
            const x = node.position.x;
            const y = node.position.y;
            const width = node.measured?.width;
            const height = node.measured?.height;

            fitBounds({
              x,
              y,
              width,
              height,
            });
          }
        }, 50);
      } else {
        setTimeout(() => {
          fitView();
        }, 50);
      }
    }
  }, [params, nodes]);

  return (
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
      onNodesDelete={onNodesDelete}
      nodeTypes={nodeTypes}
      edgeTypes={CustomEdgeTypes}
      fitView
    >
      <FlowPanel />
      <Controls />
      <Background />
    </ReactFlow>
  );
};
