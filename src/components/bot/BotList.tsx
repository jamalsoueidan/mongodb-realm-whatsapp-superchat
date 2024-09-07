import { Link, useLocation } from "wouter";

import {
  Anchor,
  Button,
  Divider,
  Flex,
  Group,
  Progress,
  ScrollArea,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import dayjs from "dayjs";
import React, { useCallback } from "react";
import { Bot, useBot } from "../../hooks/useBot";
import { useUserFunction } from "../../hooks/useUserFunction";
import { CustomModal } from "../CustomModal";
import { initialEdges, initialNodes } from "./defaultValues";

export const BotList = () => {
  const [, setLocation] = useLocation();
  const [opened, { open, close }] = useDisclosure(false);

  const { create: botCreate } = useBot();
  const [title, setTitle] = React.useState("");

  const { data } = useUserFunction<Array<Bot>>("func-bot-list");

  const create = useCallback(() => {
    botCreate({
      title,
      nodes: initialNodes,
      edges: initialEdges,
      status: "draft",
    }).then((value) => {
      setLocation(`/${value._id}`);
    });
  }, [botCreate, setLocation, title]);

  return (
    <Flex bg="white" flex="1" direction="column" style={{ overflow: "hidden" }}>
      <Flex p="md" h="60px" justify="space-between" align="center" gap="xs">
        <Title order={3}>Bots</Title>
        <Button onClick={open}>Create new bot</Button>
      </Flex>
      <Divider />

      <ScrollArea.Autosize type="scroll" mah="100%" w="100%" mx="auto">
        <Table.ScrollContainer minWidth={800}>
          <Table verticalSpacing="xs">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Title</Table.Th>
                <Table.Th>Stats</Table.Th>

                <Table.Th>Status</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data?.map((bot) => {
                const timestamp = dayjs(bot.updated_at * 1000);
                return (
                  <Table.Tr key={bot._id.toString()}>
                    <Table.Td>
                      <Anchor component={Link} to={`/${bot._id}`}>
                        {bot.title}
                      </Anchor>
                      <Text size="xs">updated {timestamp.fromNow()}</Text>
                    </Table.Td>

                    <Table.Td>
                      <Group justify="space-between">
                        <Text fz="xs" c="teal" fw={700}>
                          {100}%
                        </Text>
                        <Text fz="xs" c="red" fw={700}>
                          {100}%
                        </Text>
                      </Group>
                      <Progress.Root>
                        <Progress.Section value={100} color="teal" />
                        <Progress.Section value={100} color="red" />
                      </Progress.Root>
                      <Anchor
                        component={Link}
                        to={`/${bot._id}/logs?toggle=logs`}
                        fz="sm"
                      >
                        View log
                      </Anchor>
                    </Table.Td>

                    <Table.Td>
                      <Text size="xs"> {bot.status}</Text>
                      <Text size="xs">total {bot.nodes.length} steps</Text>
                    </Table.Td>
                  </Table.Tr>
                );
              })}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </ScrollArea.Autosize>
      <CustomModal opened={opened} onClose={close} title="Create new bot">
        <Stack>
          <TextInput
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            label="Title"
          />
          <Button onClick={() => create()} disabled={title.length < 3}>
            Create bot
          </Button>
        </Stack>
      </CustomModal>
    </Flex>
  );
};
