import { ActionIcon, Box, Divider, Flex, Title } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useReactFlow } from "reactflow";
import { Link } from "wouter";
import { useMobile } from "../../hooks/useMobile";
import { TriggerProvider } from "./TriggerProvider";

export function TriggerDrawerControl() {
  const isMobile = useMobile();
  const { setNodes } = useReactFlow();
  return (
    <>
      <Flex px="sm" py="xs" h="60px" align="center" justify="space-between">
        <Title order={4}>Add an action</Title>
        {isMobile ? (
          <ActionIcon
            variant="transparent"
            aria-label="Back"
            color="black"
            component={Link}
            to={`/`}
          >
            <IconX stroke={1.5} />
          </ActionIcon>
        ) : null}
      </Flex>
      <Divider />
      <Box p="md">
        <TriggerProvider setNodes={setNodes} />
      </Box>
    </>
  );
}
