import { Edge, Node } from "@xyflow/react";
import { CustomNodeTypes } from "../../CustomNodeTypes";
import { InteractiveFlow } from "./InteractiveFlowType";

export const InteractiveFlowDefault: InteractiveFlow = {
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

  const nodes: CustomNodeTypes[] = [];
  const edges: Edge[] = [];

  const newComponent: InteractiveFlow = JSON.parse(
    JSON.stringify(InteractiveFlowDefault)
  );

  const selectNode: CustomNodeTypes = {
    id: new Realm.BSON.ObjectId().toString(),
    position: { x: 0, y: 0 },
    type: "plus",
    data: { name: "" },
  };

  nodes.push(selectNode);
  edges.push({
    id: `${id}-${selectNode.id}`,
    source: id,
    sourceHandle: selectNode.id,
    target: selectNode.id,
    type: "delete-edge",
    animated: true,
  });

  nodes.push({
    id,
    data: newComponent,
    position,
    type: "interactive-flow",
  });

  return { nodes, edges };
};
