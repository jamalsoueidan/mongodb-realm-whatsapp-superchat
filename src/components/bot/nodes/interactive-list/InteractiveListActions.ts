import { Edge, Node } from "@xyflow/react";
import Realm from "realm";
import { CustomNodeTypes } from "../../CustomNodeTypes";
import { InteractiveList } from "./InteractiveListType";

export const InteractiveListDefault: InteractiveList = {
  whatsapp: {
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
  },
};

export const createInteractiveListNode = (replace: Node) => {
  const { id } = replace;
  const nodes: CustomNodeTypes[] = [];
  const edges: Edge[] = [];

  const newComponent: InteractiveList = JSON.parse(
    JSON.stringify(InteractiveListDefault)
  );

  newComponent.whatsapp.interactive.action.sections.forEach((section) => {
    section.rows = section.rows.map((row) => {
      row.id = new Realm.BSON.ObjectId().toString();
      const selectNode: CustomNodeTypes = {
        id: row.id,
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

      return row;
    });
  });

  nodes.push({
    ...replace,
    id,
    data: newComponent,
    type: "interactive-list",
  });

  return { nodes, edges };
};
