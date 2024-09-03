import { Box } from "@mantine/core";
import { Node, NodeProps, Position } from "@xyflow/react";
import { CustomHandle } from "../../handlers/CustomHandler";
import { NodeWrapper } from "../../NodeWrapper";
import { Start } from "./StartType";

export type StartNode = Node<Start, "start">;

export const StartNode = (props: NodeProps<StartNode>) => {
  return (
    <NodeWrapper withTarget={false} {...props}>
      <Box p="xs" pos="relative">
        {props.data.type}
        <CustomHandle
          position={props.sourcePosition || Position.Right}
          id={props.id}
          type="source"
        />
      </Box>
    </NodeWrapper>
  );
};
