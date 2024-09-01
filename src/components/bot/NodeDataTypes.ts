import { InteractiveButtons } from "./nodes/interactive-buttons/InteractiveButtonsAction";
import { InterctiveFlow } from "./nodes/interactive-flow/InteractiveFlowAction";
import { InteractiveList } from "./nodes/interactive-list/InteractiveListType";
import { Message } from "./nodes/message/MessageAction";
import { PlusNode } from "./nodes/plus/PlusNode";
import { StartNode } from "./nodes/start/StartNode";

export type NodesDataTypes =
  | InteractiveButtons
  | InteractiveList
  | InterctiveFlow
  | StartNode
  | PlusNode
  | Message;
