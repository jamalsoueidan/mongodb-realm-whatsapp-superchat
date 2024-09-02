import { Stack } from "@mantine/core";
import { NodeProps } from "@xyflow/react";
import { MessageNode } from "./MessageNode";

export function MessageControls(props: NodeProps<MessageNode>) {
  return <Stack>{props.type}</Stack>;
}
