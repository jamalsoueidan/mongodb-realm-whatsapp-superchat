import { ComponentType } from "react";
import { NodeProps } from "reactflow";
import { InteractiveButtonsNode } from "./nodes/InteractiveButtonsNode";
import { InteractiveFlowNode } from "./nodes/InteractiveFlowNode";
import { InteractiveListNode } from "./nodes/InteractiveListNode";
import { MessageNode } from "./nodes/MessageNode";
import { PlusNode } from "./nodes/PlusNode";
import { StartNode } from "./nodes/StartNode";

export enum NodeTypes {
  InteractiveList = "interactive-list",
  InteractiveFlow = "interactive-flow",
  InteractiveButtons = "interactive-buttons",
  StartNode = "start-node",
  PlusNode = "connect-node",
  Message = "message",
}

export const nodeTypes: Record<NodeTypes, ComponentType<NodeProps>> = {
  [NodeTypes.InteractiveList]: InteractiveListNode,
  [NodeTypes.InteractiveFlow]: InteractiveFlowNode,
  [NodeTypes.InteractiveButtons]: InteractiveButtonsNode,
  [NodeTypes.Message]: MessageNode,
  [NodeTypes.StartNode]: StartNode,
  [NodeTypes.PlusNode]: PlusNode,
};
