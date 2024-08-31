import { InterctiveFlow } from "./nodes/InteractiveFlowNode";
import { Message } from "./nodes/MessageNode";
import { PlusNode } from "./nodes/PlusNode";
import { StartNode } from "./nodes/StartNode";

export type NodesDataTypes =
  | InteractiveButtons
  | InteractiveList
  | InterctiveFlow
  | StartNode
  | PlusNode
  | Message;
