import { Button } from "@mantine/core";
import {
  Edge,
  Node,
  Panel,
  Position,
  useNodesInitialized,
  useReactFlow,
} from "@xyflow/react";
import dagre from "dagre";
import { useLayoutEffect, useState } from "react";

// https://ncoughlin.com/posts/react-flow-dagre-custom-nodes
type RankDir = "TB" | "BT" | "LR" | "RL";
const options: { rankdir: RankDir } = { rankdir: "LR" };
const positionMap: Record<
  RankDir,
  { targetPosition: Position; sourcePosition: Position }
> = {
  TB: { targetPosition: Position.Top, sourcePosition: Position.Bottom },
  BT: { targetPosition: Position.Bottom, sourcePosition: Position.Top },
  LR: { targetPosition: Position.Left, sourcePosition: Position.Right },
  RL: { targetPosition: Position.Right, sourcePosition: Position.Left },
};

const getLayoutedElements = (nodes: Node[], edges: Array<Edge>) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  dagreGraph.setGraph(options);

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, {
      ...node,
      width: node.measured!.width! + 100,
      height: node.measured!.height! + 50,
    });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const positions = positionMap[options.rankdir] || {
    targetPosition: Position.Top,
    sourcePosition: Position.Bottom,
  };

  const newNodes = nodes.map((node) => {
    const { x, y } = dagreGraph.node(node.id);

    return {
      ...node,
      position: {
        x: x - node.measured!.width! / 2,
        y: y - node.measured!.height! / 2,
      },
      targetPosition: positions.targetPosition,
      sourcePosition: positions.sourcePosition,
    };
  });

  return { nodes: newNodes, edges };
};

export const NodeAutoLayout = () => {
  const [layout, setLayout] = useState(false);
  const nodesInitialized = useNodesInitialized({
    includeHiddenNodes: false,
  });
  //Todo: when clicking node, zoom on it, and show it instead of the whole flow.

  const { getNodes, setNodes, getEdges, setEdges, fitView } = useReactFlow();

  useLayoutEffect(() => {
    if (nodesInitialized) {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(getNodes(), getEdges());

      setNodes(layoutedNodes);
      setEdges(layoutedEdges);

      window.requestAnimationFrame(() => {
        fitView({ maxZoom: 1.5 });
      });
    }
  }, [nodesInitialized, fitView, getEdges, getNodes, setEdges, setNodes]);

  useLayoutEffect(() => {
    if (layout) {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(getNodes(), getEdges());

      setNodes(layoutedNodes);
      setEdges(layoutedEdges);
      setLayout(false);

      window.requestAnimationFrame(() => {
        fitView({ maxZoom: 1.5 });
      });
    }
  }, [
    nodesInitialized,
    fitView,
    getEdges,
    getNodes,
    setEdges,
    setNodes,
    layout,
  ]);

  return (
    <Panel>
      <Button variant="outline" onClick={() => setLayout(true)}>
        Layout
      </Button>
    </Panel>
  );
};
