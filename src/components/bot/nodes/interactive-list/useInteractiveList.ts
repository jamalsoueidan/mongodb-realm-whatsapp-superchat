import { useCallback } from "react";
import { Edge, Node, useReactFlow } from "reactflow";

import { NodeEnumTypes } from "../../NodeEnumTypes";
import { InteractiveList } from "./InteractiveListType";

export const useInteractiveList = (id: string) => {
  const { setNodes, setEdges, getNode } = useReactFlow();

  const addOnclick = useCallback(
    ({ nodes, edges }: { nodes: Node[]; edges: Edge[] }) => {
      setNodes((prev: Array<Node<unknown>>) => {
        return [...prev.filter((node) => node.id !== id), ...nodes];
      });

      setEdges((prev: Array<Edge<unknown>>) => {
        return [...prev, ...edges];
      });
    },
    [id, setEdges, setNodes]
  );

  const node = getNode(id);

  const addButtonToSection = useCallback(
    (sectionIndex: number) => {
      if (!node) {
        throw new Error("Node not found");
      }

      const nodes: Node[] = [];
      const edges: Edge[] = [];

      const newComponent: InteractiveList = JSON.parse(
        JSON.stringify(node.data)
      );

      const newRow = {
        id: new Realm.BSON.ObjectId().toString(),
        title: "Action Menu",
      };

      newComponent.interactive.action.sections[sectionIndex].rows.push(newRow);

      const selectNode: Node = {
        id: newRow.id,
        position: { x: 0, y: 0 },
        type: NodeEnumTypes.PlusNode,
        data: { name: "" },
      };

      nodes.push(selectNode);
      edges.push({
        id: `${id}-${selectNode.id}`,
        source: id,
        sourceHandle: selectNode.id,
        target: selectNode.id,
      });

      nodes.push({
        ...node,
        id,
        data: newComponent,
        type: NodeEnumTypes.InteractiveList,
      });

      return addOnclick({ nodes, edges });
    },
    [addOnclick, id, node]
  );

  return { addButtonToSection };
};
