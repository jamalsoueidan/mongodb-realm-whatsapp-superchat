import { Edge, Node } from "reactflow";
import { NodeEnumTypes } from "../../NodeEnumTypes";

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

      return button;
    });

  nodes.push({
    id,
    data: newComponent,
    position,
    type: NodeEnumTypes.InteractiveButtons,
  });

  return { nodes, edges };
};
