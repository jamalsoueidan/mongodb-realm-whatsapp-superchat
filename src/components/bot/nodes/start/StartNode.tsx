import { Button } from "@mantine/core";
import { Node, NodeProps, Position } from "@xyflow/react";
import { Link } from "wouter";
import { CustomHandle } from "../../handlers/CustomHandler";
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
      <CustomHandle
        position={sourcePosition || Position.Right}
        id={id}
        type="source"
      />
    </>
  );
};
