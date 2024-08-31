import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { Handle, NodeProps, Position } from "reactflow";
import { Link } from "wouter";

export type PlusNode = {
  name?: string;
};

export const PlusNode = ({ id, targetPosition }: NodeProps<unknown>) => {
  return (
    <>
      <Button
        variant="default"
        size="lg"
        radius="md"
        pos="relative"
        component={Link}
        to={`/replace/${id}`}
      >
        <Handle
          position={targetPosition || Position.Left}
          id={id}
          type="target"
        />
        <IconPlus />
      </Button>
    </>
  );
};
