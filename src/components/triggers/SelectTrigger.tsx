import { Button, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import {
  Edge,
  Handle,
  Node,
  NodeProps,
  Position,
  useReactFlow,
} from "reactflow";
import { CustomModal } from "../CustomModal";

export type SelectTrigger = {
  name?: string;
};

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

export const SelectTrigger = ({ id }: NodeProps<unknown>) => {
  const { setNodes, setEdges } = useReactFlow();

  const addOnclick = () => {
    const newNodes: Node[] = [
      {
        id,
        data: Components[0],
        position: { x: 400, y: 500 },
        type: "interactive-list",
      },
    ];

    const edges: Edge[] = [];
    Components[0].interactive.action.sections.forEach((section) => {
      section.rows.forEach((row) => {
        const selectTrigger: Node = {
          id: row.id,
          position: { x: 23, y: 23 },
          type: "select-trigger",
          data: { name: "test" },
        };
        newNodes.push(selectTrigger);
        edges.push({
          id: `${id}-${selectTrigger.id}`,
          source: id,
          target: selectTrigger.id,
        });
      });
    });

    console.log(newNodes, edges);

    setNodes((prev: Array<Node<unknown>>) => {
      return [...prev.filter((node) => node.id !== id), ...newNodes];
    });

    setEdges((prev: Array<Edge<unknown>>) => {
      return [...prev, ...edges];
    });
  };

  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Button
        variant="default"
        size="lg"
        miw="200px"
        radius="md"
        onClick={open}
        pos="relative"
      >
        <Handle
          style={{
            width: rem(10),
            height: rem(10),
            position: "fixed",
          }}
          position={Position.Left}
          id={id}
          type="target"
        />
        <IconPlus />
      </Button>
      <CustomModal opened={opened} onClose={close}>
        <Button onClick={addOnclick}>Add Interactive-List</Button>
      </CustomModal>
    </>
  );
};
