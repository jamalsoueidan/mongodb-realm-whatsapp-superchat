import { Button } from "@mantine/core";
import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import { Link } from "wouter";
import { Start } from "./StartType";

export type StartNode = Node<Start, "start">;

export const StartNode = ({ id, sourcePosition }: NodeProps<StartNode>) => {
  return (
    <>
      <Button
        size="lg"
        miw="200px"
        radius="md"
        pos="relative"
        component={Link}
        to={`/replace/${id}`}
      >
        Start trigger
      </Button>
      <Handle
        position={sourcePosition || Position.Right}
        id={id}
        type="source"
      />
    </>
  );
};
