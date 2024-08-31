import { Button } from "@mantine/core";
import { NodeProps } from "reactflow";
import { Link } from "wouter";

export type SelectNode = {
  name?: string;
};

export const SelectNode = ({ id }: NodeProps<unknown>) => {
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
        Select trigger
      </Button>
    </>
  );
};
