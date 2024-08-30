import { ActionIcon, Box, rem } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { Handle, NodeProps, Position } from "reactflow";
import { useLocation, useParams } from "wouter";
import { useMobile } from "../../hooks/useMobile";

export function withTrigger<T extends NodeProps>(
  WrappedComponent: React.ComponentType<T>
) {
  const EnhancedComponent = (props: T) => {
    const [, setLocation] = useLocation();
    const params = useParams();
    const isMobile = useMobile();

    return (
      <Box
        p="sm"
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
        <Handle
          type="target"
          position={props.targetPosition || Position.Left}
          id={props.id}
          style={{ width: rem(10), height: rem(10) }}
        />
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
        <WrappedComponent {...props} />
      </Box>
    );
  };

  const wrappedComponentName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";
  EnhancedComponent.displayName = `withAdditionalLogic(${wrappedComponentName})`;

  return EnhancedComponent;
}
