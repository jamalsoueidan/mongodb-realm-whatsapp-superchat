import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import { Link } from "wouter";
import { Plus } from "./PlusType";

export type PlusNode = Node<Plus, "plus">;

export const PlusNode = ({ id, targetPosition }: NodeProps<PlusNode>) => {
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
        <IconPlus />
      </Button>
      <Handle
        position={targetPosition || Position.Left}
        id={id}
        type="target"
      />
    </>
  );
};