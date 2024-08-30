import { rem } from "@mantine/core";
import { Handle, HandleProps } from "reactflow";

export const CustomHandle = (props: HandleProps) => {
  return (
    <Handle
      style={{
        width: rem(10),
        height: rem(10),
        transform: "unset",
        top: "unset",
        position: "fixed",
      }}
      {...props}
    />
  );
};
