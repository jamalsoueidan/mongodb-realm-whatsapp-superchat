import { Edge, Node } from "reactflow";
import { InteractiveButtons } from "./InteractiveButtons";
import { InterctiveFlow } from "./InteractiveFlow";
import { InteractiveList } from "./InteractiveList";
import { SelectTrigger } from "./SelectTrigger";

export enum NodeTypes {
  InteractiveList = "interactive-list",
  InteractiveFlow = "interactive-flow",
  InteractiveButtons = "interactive-buttons",
  SelectTrigger = "select-trigger",
}

export type NodesDataTypes =
  | InteractiveButtons
  | InteractiveList
  | InterctiveFlow
  | SelectTrigger;

export const initialNodes: Node<NodesDataTypes, NodeTypes>[] = [
  /*{
    id: "4",
    position: { x: 23, y: 23 },
    type: NodeTypes.SelectTrigger,
    data: { name: "test" },
  },*/
  {
    id: "1",
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
  },
  {
    id: "2",
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
    id: "3",
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
                id: "<BUTTfseID>",
                title: "<BUTTON_LABEL_TEXT>",
              },
            },
            {
              type: "reply",
              reply: {
                id: "<BUTasd",
                title: "<BUTTON_LABEL_TEXT>",
              },
            },
            {
              type: "reply",
              reply: {
                id: "<BUfseN_ID>",
                title: "<BUTTON_LABEL_TEXT>",
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
    id: "edaw",
    source: "1",
    sourceHandle: "priority_express",
    target: "2",
    animated: true,
  },
  {
    id: "e1dawdaw-2",
    source: "1",
    sourceHandle: "priority_mail",
    target: "3",
    animated: true,
  },
];
