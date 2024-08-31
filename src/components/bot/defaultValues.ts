import { Edge, Node } from "reactflow";
import { NodesDataTypes } from "./NodeDataTypes";
import { NodeTypes } from "./NodeTypes";

export const initialNodes: Node<NodesDataTypes, NodeTypes>[] = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    type: NodeTypes.StartNode,
    data: {},
  },
  /*{
    id: "2",
    position: { x: 0, y: 0 },
    type: NodeTypes.PlusNode,
    data: {},
  },*/
  {
    id: "2",
    position: { x: 0, y: 0 },
    type: NodeTypes.InteractiveList,
    data: {
      type: "interactive",
      interactive: {
        type: "list",
        header: {
          type: "text",
          text: "Choose Shipping Option",
        },
        body: {
          text: "Which shipping option do you prefer?shipping option do you prefer?",
        },
        footer: {
          text: "Lucky Shrub: Your gateway to succulents™ Your gateway to succulents™",
        },
        action: {
          button: "Shipping Options",
          sections: [
            {
              title: "I want it ASAP!",
              rows: [
                {
                  id: "priority_express",
                  title: "Priority Mail Express",
                },
              ],
            },
          ],
        },
      },
    },
  },
  {
    id: "3",
    position: { x: 0, y: 0 },
    type: NodeTypes.InteractiveFlow,
    data: {
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
    },
  },
  {
    id: "4",
    position: { x: 0, y: 0 },
    type: NodeTypes.InteractiveButtons,
    data: {
      type: "interactive",
      interactive: {
        type: "button",
        header: {
          type: "text",
          text: "asd",
        },
        body: {
          text: "<BODY_TEXT>",
        },
        footer: {
          text: "<FOOTER_TEXT>",
        },
        action: {
          buttons: [
            {
              type: "reply",
              reply: {
                id: "1",
                title: "Test",
              },
            },
            {
              type: "reply",
              reply: {
                id: "2",
                title: "Test1",
              },
            },
            {
              type: "reply",
              reply: {
                id: "3",
                title: "Test2",
              },
            },
          ],
        },
      },
    },
  },
];

export const initialEdges: Edge[] = [
  {
    id: "1-2",
    source: "1",
    target: "2",
    animated: true,
  },
  {
    id: "2-3",
    source: "2",
    sourceHandle: "priority_express",
    target: "4",
    animated: true,
  },
];
