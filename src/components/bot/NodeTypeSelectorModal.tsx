import { Button, Stack } from "@mantine/core";
import { Edge, Node, useReactFlow } from "reactflow";
import "reactflow/dist/style.css";
import { Redirect, useLocation, useRoute } from "wouter";
import { CustomModal } from "../CustomModal";
import { createInteractiveButtonNode } from "./nodes/InteractiveButtonsNode";
import { createInteractiveFlowNode } from "./nodes/InteractiveFlowNode";
import { createInteractiveListNode } from "./nodes/InteractiveListNode";
import { createMessageNode } from "./nodes/MessageNode";

export const NodeTypeSelectorModal = () => {
  const [, setLocation] = useLocation();
  const [isMatch, params] = useRoute<{ id: string }>("/replace/:id");
  const { setNodes, setEdges, getNode } = useReactFlow();

  const currentNode = getNode(params?.id || "");
  if (!currentNode) return <Redirect to="/" />;

  const addOnclick = ({ nodes, edges }: { nodes: Node[]; edges: Edge[] }) => {
    setNodes((prev: Array<Node<unknown>>) => {
      return [...prev.filter((node) => node.id !== currentNode.id), ...nodes];
    });

    setEdges((prev: Array<Edge<unknown>>) => {
      return [...prev, ...edges];
    });

    setLocation("/");
  };

  return (
    <CustomModal
      opened={isMatch}
      onClose={() => setLocation("/")}
      title="Add trigger"
    >
      <Stack>
        <Button
          onClick={() => addOnclick(createInteractiveListNode(currentNode))}
        >
          Interactive List
        </Button>

        <Button
          onClick={() => addOnclick(createInteractiveFlowNode(currentNode))}
        >
          Interactive Flow
        </Button>

        <Button
          onClick={() => addOnclick(createInteractiveButtonNode(currentNode))}
        >
          Interactive Buttons
        </Button>
        <Button onClick={() => addOnclick(createMessageNode(currentNode))}>
          Message
        </Button>
      </Stack>
    </CustomModal>
  );
};