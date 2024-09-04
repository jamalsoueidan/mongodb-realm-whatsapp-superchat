import { Edge } from "@xyflow/react";
import Realm from "realm";
import { CustomNodeTypes } from "./CustomNodeTypes";

export const initialNodes: CustomNodeTypes[] = [
  {
    id: new Realm.BSON.ObjectId().toString(),
    position: { x: 0, y: 0 },
    type: "start",
    data: { type: "on_received_message" },
  },
  {
    id: new Realm.BSON.ObjectId().toString(),
    position: { x: 0, y: 0 },
    type: "plus",
    data: {},
  },
];

export const initialEdges: Edge[] = [
  {
    id: `${initialNodes[0].id}-${initialNodes[1].id}`,
    source: initialNodes[0].id,
    target: initialNodes[1].id,
    type: "delete-edge",
    animated: true,
  },
];
