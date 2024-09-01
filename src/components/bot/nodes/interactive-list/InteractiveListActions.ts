import { Edge, Node } from "reactflow";

import { NodeEnumTypes } from "../../NodeEnumTypes";
import { InteractiveList } from "./InteractiveListType";

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

export const createInteractiveListNode = (replace: Node<unknown>) => {
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

      return row;
    });
  });

  nodes.push({
    id,
    data: newComponent,
    position,
    type: NodeEnumTypes.InteractiveList,
  });

  return { nodes, edges };
};
