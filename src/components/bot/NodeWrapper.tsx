import { ActionIcon, Box, Divider, Group, Title } from "@mantine/core";
import { IconMenu2 } from "@tabler/icons-react";
import { Handle, NodeProps, Position } from "@xyflow/react";
import { useLocation, useParams } from "wouter";

export function NodeWrapper({
  children,
  ...props
}: NodeProps & { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const params = useParams();

  return (
    <Box
      bg="white"
      style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        ...(params.id === props.id
          ? { outline: "2px solid var(--mantine-color-blue-6)" }
          : {}),
      }}
      miw="200px"
      maw="300px"
    >
      <Group
        gap="xs"
        p="xs"
        justify="space-between"
        align="center"
        pos="relative"
      >
        <Title order={4}>{capitalizeFirstLetter(props.type!)}</Title>
        <ActionIcon
          variant="transparent"
          color="black"
          onClick={() => setLocation(`${location}/controls/${props.id}`)}
        >
          <IconMenu2 />
        </ActionIcon>
        <Handle
          type="target"
          position={props.targetPosition || Position.Top}
          id={props.id}
        />
      </Group>
      <Divider />
      {children}
    </Box>
  );
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
