import { Link, useLocation } from "wouter";

import {
  Avatar,
  Button,
  Card,
  Divider,
  Flex,
  Group,
  ScrollArea,
  Stack,
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
        {data?.map((bot) => {
          const timestamp = dayjs(bot.updated_at * 1000);
          return (
            <React.Fragment key={bot._id.toString()}>
              <Card p="xs" component={Link} to={`/${bot._id}`} radius="0">
                <Group>
                  <Avatar size="lg" />
                  <Flex flex={1} justify="space-between" align="center">
                    <Stack gap="0" flex={1}>
                      <Text>{bot.title}</Text>
                      <Text size="xs" c="dimmed">
                        updated {timestamp.fromNow()}
                      </Text>
                    </Stack>
                    <Text size="xs">Steps {bot.nodes.length}</Text>
                  </Flex>
                </Group>
              </Card>
              <Divider />
            </React.Fragment>
          );
        })}
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
