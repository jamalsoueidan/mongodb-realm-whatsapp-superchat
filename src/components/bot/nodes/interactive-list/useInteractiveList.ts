import { useCallback } from "react";
import { Node, useReactFlow } from "reactflow";

import { NodeEnumTypes } from "../../NodeEnumTypes";
import { InteractiveList } from "./InteractiveListType";

export const useInteractiveList = (id: string) => {
  const { setNodes, getNode } = useReactFlow();

  const addOnclick = useCallback(
    ({ nodes }: { nodes: Node[] }) => {
      setNodes((prev: Array<Node<unknown>>) => {
        return [...prev.filter((node) => node.id !== id), ...nodes];
      });
    },
    [id, setNodes]
  );

  const node = getNode(id);

  const update = useCallback(
    (data: InteractiveList) => {
      if (!node) {
        throw new Error("Node not found");
      }

      const nodes: Node[] = [];

      nodes.push({
        ...node,
        data,
        position: node.position,
        type: NodeEnumTypes.InteractiveList,
      });

      return addOnclick({ nodes });
    },
    [addOnclick, node]
  );

  return { update };
};
