import { Button } from "@mantine/core";
import { Edge, Node, useReactFlow } from "reactflow";
import "reactflow/dist/style.css";
import { Redirect, useLocation, useRoute } from "wouter";
import { CustomModal } from "../CustomModal";
import { NodeTypes } from "./defaultValues";

const Components = [
  {
    type: "interactive",
    interactive: {
      type: "list",
      header: {
        type: "text",
        text: "Choose Shipping Option",
      },
      body: {
        text: "Which shipping option do you prefer?",
      },
      footer: {
        text: "Lucky Shrub: Your gateway to succulents™",
      },
      action: {
        button: "Click me",
        sections: [
          {
            title: "I want it ASAP!",
            rows: [
              {
                id: "priority_express",
                title: "Priority Mail Express",
              },
              {
                id: "priority_mail",
                title: "Priority Mail",
              },
            ],
          },
        ],
      },
    },
  },
];

export const TriggerModal = () => {
  const [, setLocation] = useLocation();
  const [isMatch, params] = useRoute<{ id: string }>("/replace/:id");
  const { setNodes, setEdges, getNode } = useReactFlow();

  const currentNode = getNode(params?.id || "");
  if (!currentNode) return <Redirect to="/" />;

  const { id, position } = currentNode;

  const addOnclick = () => {
    const newNodes: Node[] = [
      {
        id: "new",
        data: Components[0],
        position,
        type: NodeTypes.SelectNode,
      },
    ];

    const edges: Edge[] = [];
    Components[0].interactive.action.sections.forEach((section) => {
      section.rows.forEach((row) => {
        const plusNode: Node = {
          id: row.id,
          position,
          type: NodeTypes.PlusNode,
          data: { name: "test" },
        };
        newNodes.push(plusNode);
        edges.push({
          id: `${id}-${plusNode.id}`,
          source: "new",
          sourceHandle: row.id,
          target: plusNode.id,
        });
      });
    });

    setNodes((prev) =>
      prev.map((node) => ({
        ...node,
        type: NodeTypes.InteractiveList,
        data: Components[0],
      }))
    );

    setEdges([]);
  };

  return (
    <CustomModal
      opened={isMatch}
      onClose={() => setLocation("/")}
      title="Add trigger"
    >
      <Button onClick={addOnclick}>Replace</Button>
    </CustomModal>
  );
};
