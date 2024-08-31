import { ActionIcon, Box, Divider, Group, Title } from "@mantine/core";
import { IconEdit, IconMenu2 } from "@tabler/icons-react";
import { NodeProps } from "reactflow";
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
      <Group gap="xs" p="xs" justify="space-between" align="center">
        <Title order={4}>{capitalizeFirstLetter(props.type)}</Title>

        <ActionIcon variant="transparent" color="black">
          <IconMenu2 />
        </ActionIcon>
      </Group>
      <Divider />
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
  );
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
