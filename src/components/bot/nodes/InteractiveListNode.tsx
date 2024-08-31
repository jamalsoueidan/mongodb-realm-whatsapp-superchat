import { Box, Button, Divider, NavLink, rem, Stack, Text } from "@mantine/core";
import { IconMenu2 } from "@tabler/icons-react";
import { Edge, Handle, Node, NodeProps, Position } from "reactflow";
import { CustomHandle } from "../handlers/CustomHandle";
import { NodeTypes } from "../NodeTypes";
import { NodeWrapper } from "./NodeWrapper";

export type InteractiveList = {
  type: string;
  interactive: {
    type: string;
    header: {
      type: string;
      text: string;
    };
    body: {
      text: string;
    };
    footer: {
      text: string;
    };
    action: {
      button: string;
      sections: Array<{
        title: string;
        rows: Array<{
          id: string;
          title: string;
        }>;
      }>;
    };
  };
};

export const InteractiveListDefault: InteractiveList = {
  type: "interactive",
  interactive: {
    type: "list",
    header: {
      type: "text",
      text: "Header",
    },
    body: {
      text: "Body",
    },
    footer: {
      text: "Footer",
    },
    action: {
      button: "Action Button",
      sections: [
        {
          title: "Title",
          rows: [
            {
              id: "1",
              title: "Action Menu",
            },
          ],
        },
      ],
    },
  },
};

export const createInteractiveListNode = (replace: Node) => {
  const { id, position } = replace;

  const nodes: Node[] = [];
  const edges: Edge[] = [];

  const newComponent: InteractiveList = JSON.parse(
    JSON.stringify(InteractiveListDefault)
  );

  newComponent.interactive.action.sections.forEach((section) => {
    section.rows = section.rows.map((row) => {
      row.id = new Realm.BSON.ObjectId().toString();
      const selectNode: Node = {
        id: row.id,
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

      return row;
    });
  });

  nodes.push({
    id,
    data: newComponent,
    position,
    type: NodeTypes.InteractiveList,
  });

  return { nodes, edges };
};

export const InteractiveListNode = (props: NodeProps<InteractiveList>) => {
  const {
    data: { interactive },
    sourcePosition,
  } = props;
  return (
    <NodeWrapper {...props}>
      <Stack gap={rem(2)} pos="relative" p="sm">
        <Text fw="bold">{interactive.header.text}</Text>
        <Text>{interactive.body.text}</Text>
        <Text c="dimmed" fz="sm">
          {interactive.footer.text}
        </Text>
        <Button variant="outline" leftSection={<IconMenu2 />}>
          {interactive.action.button}
        </Button>
        <Handle
          type="target"
          position={props.targetPosition || Position.Top}
          id={props.id}
        />
      </Stack>

      {interactive.action.sections.map((section) => {
        return (
          <Stack key={section.title} gap={rem(2)} mb="sm">
            <Text c="dimmed" fz="sm" fw="bold" px="sm">
              {section.title}
            </Text>
            <Divider />
            {section.rows.map((row) => {
              return (
                <Box pos="relative" key={row.id} px="sm">
                  <NavLink
                    variant="transparent"
                    active
                    label={row.title}
                    px="0"
                  />
                  <CustomHandle
                    type="source"
                    position={sourcePosition || Position.Right}
                    id={row.id}
                  />
                </Box>
              );
            })}
            <Box px="sm">
              <Button>Add button</Button>
            </Box>
          </Stack>
        );
      })}
    </NodeWrapper>
  );
};
