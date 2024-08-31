import { rem, Stack, Text, Title } from "@mantine/core";
import { Edge, Handle, Node, NodeProps, Position } from "reactflow";
import { NodeTypes } from "../NodeTypes";
import { NodeWrapper } from "./NodeWrapper";

export type InterctiveFlow = {
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
      name: string;
      parameters: {
        flow_message_version: string;
        flow_token: string;
        flow_id: string;
        mode: string;
        flow_cta: string;
        flow_action: string;
        flow_action_payload: {
          screen: string;
        };
      };
    };
  };
};

export const InteractiveFlowDefault: InterctiveFlow = {
  type: "interactive",
  interactive: {
    type: "flow",
    header: {
      type: "text",
      text: "values.header",
    },
    body: {
      text: "values.body",
    },
    footer: {
      text: "values.footer",
    },
    action: {
      name: "flow",
      parameters: {
        flow_message_version: "3",
        flow_token: "unused",
        flow_id: "x", //must choose
        mode: "draft",
        flow_cta: "click me button",
        flow_action: "navigate",
        flow_action_payload: {
          screen: "INITIAL",
        },
      },
    },
  },
};

export const createInteractiveFlowNode = (replace: Node) => {
  const { id, position } = replace;

  const nodes: Node[] = [];
  const edges: Edge[] = [];

  const newComponent: InterctiveFlow = JSON.parse(
    JSON.stringify(InteractiveFlowDefault)
  );

  const selectNode: Node = {
    id: new Realm.BSON.ObjectId().toString(),
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

  nodes.push({
    id,
    data: newComponent,
    position,
    type: NodeTypes.InteractiveFlow,
  });

  return { nodes, edges };
};

export const InteractiveFlowNode = (props: NodeProps<InterctiveFlow>) => {
  const {
    data: { interactive },
  } = props;
  return (
    <NodeWrapper {...props}>
      <Stack gap={rem(2)} pos="relative" p="sm">
        <Title order={4}>{interactive.header.text}</Title>
        <Text fz="md">{interactive.body.text}</Text>
        <Text c="dimmed" fz="sm">
          {interactive.footer.text}
        </Text>
        <Handle
          type="target"
          position={props.targetPosition || Position.Left}
          id={props.id}
        />
        <Handle
          type="source"
          position={props.sourcePosition || Position.Right}
          id={props.id}
        />
      </Stack>
    </NodeWrapper>
  );
};
