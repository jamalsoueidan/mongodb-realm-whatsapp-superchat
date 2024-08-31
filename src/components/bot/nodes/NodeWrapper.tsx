import { ActionIcon, Box } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { NodeProps, NodeToolbar, Position } from "reactflow";
import { useLocation, useParams } from "wouter";
import { useMobile } from "../../../hooks/useMobile";

export function NodeWrapper({
  children,
  ...props
}: NodeProps<unknown> & { children: React.ReactNode }) {
  const [, setLocation] = useLocation();
  const params = useParams();
  const isMobile = useMobile();

  return (
    <>
      <NodeToolbar isVisible={true || undefined} position={Position.Top}>
        <button>delete</button>
      </NodeToolbar>
      <Box
        bg="white"
        style={{
          position: "relative",
          border: "1px solid #ccc",
          borderRadius: "10px",
          ...(params.id === props.id
            ? { outline: "2px solid var(--mantine-color-blue-6)" }
            : {}),
        }}
        miw="200px"
        maw="300px"
        {...props}
      >
        {isMobile ? (
          <ActionIcon
            variant="transparent"
            pos="absolute"
            right="4px"
            top="4px"
            onClick={() => setLocation(`/controls/${props.id}`)}
          >
            <IconEdit />
          </ActionIcon>
        ) : null}
        {children}
      </Box>
    </>
  );
}
