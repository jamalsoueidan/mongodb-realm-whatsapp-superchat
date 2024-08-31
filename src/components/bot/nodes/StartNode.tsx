import { Button } from "@mantine/core";
import { Handle, NodeProps, Position } from "reactflow";
import { Link } from "wouter";

export type StartNode = {
  name?: string;
};

export const StartNode = ({ id, sourcePosition }: NodeProps<unknown>) => {
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
