import { Edge, Node } from "reactflow";
import { NodeEnumTypes } from "../../NodeEnumTypes";

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
    id,
    data: newComponent,
    position,
    type: NodeEnumTypes.InteractiveFlow,
  });

  return { nodes, edges };
};
