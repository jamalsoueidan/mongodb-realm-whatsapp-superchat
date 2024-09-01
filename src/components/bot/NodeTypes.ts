import { ComponentType } from "react";
import { NodeProps } from "reactflow";

import { NodeEnumTypes } from "./NodeEnumTypes";

import { InteractiveButtonsNode } from "./nodes/interactive-buttons/InteractiveButtonsNode";
import { InteractiveFlowNode } from "./nodes/interactive-flow/InteractiveFlowNode";
import { InteractiveListNode } from "./nodes/interactive-list/InteractiveListNode";
import { MessageNode } from "./nodes/message/MessageNode";
import { PlusNode } from "./nodes/plus/PlusNode";
import { StartNode } from "./nodes/start/StartNode";

export const nodeTypes: Record<NodeEnumTypes, ComponentType<NodeProps>> = {
  [NodeEnumTypes.InteractiveList]: InteractiveListNode,
  [NodeEnumTypes.InteractiveFlow]: InteractiveFlowNode,
  [NodeEnumTypes.InteractiveButtons]: InteractiveButtonsNode,
  [NodeEnumTypes.Message]: MessageNode,
  [NodeEnumTypes.StartNode]: StartNode,
  [NodeEnumTypes.PlusNode]: PlusNode,
};
