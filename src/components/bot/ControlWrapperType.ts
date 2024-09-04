import { Node, NodeProps } from "@xyflow/react";

export type ControlWrapperComponent<
  T extends Node<Record<string, unknown>, string>
> = {
  onValuesChange: (value: unknown) => void;
  node: NodeProps<T>;
};
