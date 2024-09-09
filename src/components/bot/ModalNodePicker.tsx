import { Button, Stack } from "@mantine/core";
import { Edge, Node, useReactFlow } from "@xyflow/react";

import { useLocation, useRoute } from "wouter";
import { CustomModal } from "../CustomModal";
import { createChatNode } from "./nodes/chat/ChatAction";
import { createInteractiveButtonNode } from "./nodes/interactive-buttons/InteractiveButtonsAction";
import { createInteractiveFlowNode } from "./nodes/interactive-flow/InteractiveFlowAction";
import { createInteractiveListNode } from "./nodes/interactive-list/InteractiveListActions";
import { createLocationNode } from "./nodes/location/LocationAction";
import { createMessageNode } from "./nodes/message/MessageAction";

export const ModalNodePicker = () => {
  const [, setLocation] = useLocation();
  const [isMatch, params] = useRoute<{
    flowId: string;
    id: string;
    section: "replace" | "controls";
  }>(":flowId/:section/:id");
  const { setNodes, setEdges, getNode } = useReactFlow();

  const currentNode = getNode(params?.id || "");
  if (!currentNode || params?.section !== "replace") return null;

  const addOnclick = ({ nodes, edges }: { nodes: Node[]; edges: Edge[] }) => {
    setNodes((prev: Array<Node>) => {
      return [...prev.filter((node) => node.id !== currentNode.id), ...nodes];
    });

    setEdges((prev: Array<Edge>) => {
      return [...prev, ...edges];
    });

    setLocation(`/${params.flowId}`);
  };

  return (
    <CustomModal
      opened={isMatch}
      onClose={() => setLocation(`/${params.flowId}`)}
      title="Add trigger"
    >
      <Stack>
        <Button onClick={() => addOnclick(createChatNode(currentNode))}>
          ChatGPT
        </Button>
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
        <Button onClick={() => addOnclick(createLocationNode(currentNode))}>
          Location
        </Button>
      </Stack>
    </CustomModal>
  );
};
