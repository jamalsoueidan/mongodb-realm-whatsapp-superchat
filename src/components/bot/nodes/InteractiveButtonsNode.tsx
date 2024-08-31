import { Box, Button, rem, Stack, Text } from "@mantine/core";
import { Edge, Handle, Node, NodeProps, Position } from "reactflow";
import { CustomHandle } from "../handlers/CustomHandle";
import { NodeTypes } from "../NodeTypes";
import { NodeWrapper } from "./NodeWrapper";

export type InteractiveButtons = {
  type: string;
  interactive: {
    type: "button";
    header: {
      type: "text"; //can be image, and other type
      text: string;
    };
    body: {
      text: string;
    };
    footer: {
      text: string;
    };
    action: {
      buttons: Array<{
        type: "reply";
        reply: {
          id: string;
          title: string;
        };
      }>;
    };
  };
};

export const InteractiveButtonsDefault: InteractiveButtons = {
  type: "interactive",
  interactive: {
    type: "button",
    header: {
      type: "text",
      text: "Title",
    },
    body: {
      text: "Body",
    },
    footer: {
      text: "Footer",
    },
    action: {
      buttons: [
        {
          type: "reply",
          reply: {
            id: "1",
            title: "Button",
          },
        },
      ],
    },
  },
};

export const createInteractiveButtonNode = (replace: Node) => {
  const { id, position } = replace;

  const nodes: Node[] = [];
  const edges: Edge[] = [];

  const newComponent: InteractiveButtons = JSON.parse(
    JSON.stringify(InteractiveButtonsDefault)
  );

  newComponent.interactive.action.buttons =
    newComponent.interactive.action.buttons.map((button) => {
      button.reply.id = new Realm.BSON.ObjectId().toString();
      const selectNode: Node = {
        id: button.reply.id,
        position: { x: 0, y: 0 },
        type: NodeTypes.PlusNode,
        data: { name: "" },
      };

      nodes.push(selectNode);
      edges.push({
        id: `${id}-${selectNode.id}`,
        source: id,
        sourceHandle: selectNode.id,
        target: selectNode.id,
      });

      return button;
    });

  nodes.push({
    id,
    data: newComponent,
    position,
    type: NodeTypes.InteractiveButtons,
  });

  return { nodes, edges };
};

export const InteractiveButtonsNode = (
  props: NodeProps<InteractiveButtons>
) => {
  const {
    data: { interactive },
  } = props;

  return (
    <NodeWrapper {...props}>
      <Box p="sm" pos="relative">
        <Text fw="bold">{interactive.header.text}</Text>
        <Text>{interactive.body.text}</Text>
        <Text c="dimmed" fz="sm">
          {interactive.footer.text}
        </Text>

        <Handle
          type="target"
          position={props.targetPosition || Position.Top}
          id={props.id}
          style={{ width: rem(10), height: rem(10) }}
        />
      </Box>
      <Stack gap={rem(4)} my="sm">
        {interactive.action.buttons.map((button) => {
          return (
            <Box pos="relative" key={button.reply.id} px="sm">
              <Button variant="outline" key={button.reply.id} w="100%">
                {button.reply.title}
              </Button>
              <CustomHandle
                type="source"
                position={props.sourcePosition || Position.Right}
                id={button.reply.id}
              />
            </Box>
          );
        })}
      </Stack>
    </NodeWrapper>
  );
};
