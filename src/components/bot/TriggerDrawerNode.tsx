import { ActionIcon, Box, Divider, Flex, Title } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useNodes } from "reactflow";
import { Link, useParams } from "wouter";
import { useMobile } from "../../hooks/useMobile";
import { NodesDataTypes } from "./defaultValues";

export function TriggerDrawerNode() {
  const isMobile = useMobile();
  const nodes = useNodes<NodesDataTypes>();
  const params = useParams<{ id: string }>();

  const node = nodes.find((n) => n.id === params.id);
  if (!node) {
    return <>Not found</>;
  }

  return (
    <>
      <Flex px="sm" py="xs" h="60px" align="center" justify="space-between">
        <Title order={4}>Interactive</Title>
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
      </Flex>{" "}
      <Divider />
      <Box p="md">asd</Box>
    </>
  );
}

/*
{node.type === NodeTypes.InteractiveList ? (
          <Stack>
            <TextInput
              label="Header"
              defaultValue={node.data.interactive?.header.text}
            />
            <Textarea label="Body">{node.data.interactive.body.text}</Textarea>
            <TextInput
              label="Footer"
              defaultValue={node.data.interactive.footer.text}
            />
          </Stack>
        ) : null}
        {node.type === NodeTypes.InteractiveButtons ? (
          <>
            <TextInput
              label="Header"
              defaultValue={node.data.interactive.header.text}
            />
          </>
        ) : null}*/
