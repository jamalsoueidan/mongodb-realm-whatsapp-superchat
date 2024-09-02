import { Edge, Node } from "@xyflow/react";

import { Link } from "wouter";

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
  Title,
} from "@mantine/core";
import { useUser } from "@realm/react";
import React, { useCallback } from "react";
import { useUserFunction } from "../../hooks/useUserFunction";
import { initialEdges, initialNodes } from "./defaultValues";

export type Bot = {
  _id: Realm.BSON.ObjectId;
  user: string;
  title: string;
  edges: Edge[];
  nodes: Node[];
  business_phone_number_id: string;
  created_at: number;
  updated_at: number;
};

export type Results = Array<Bot>;

export const BotList = () => {
  const user = useUser();

  const { data } = useUserFunction<Results>("func-bot-list", {
    business_phone_number_id: "364826260050460",
  });

  const create = useCallback(() => {
    user.functions["func-bot-create"]({
      business_phone_number_id: "364826260050460",
      title: "hej med dig",
      nodes: initialNodes,
      edges: initialEdges,
    }).then((value: unknown) => {
      const bot = value as Bot;
      console.log(bot._id.toString());
    });
  }, [user.functions]);

  return (
    <Flex bg="white" flex="1" direction="column" style={{ overflow: "hidden" }}>
      <Flex p="md" h="60px" justify="space-between" align="center" gap="xs">
        <Title order={3}>Bots</Title>
        <Button onClick={create}>Create new bot</Button>
      </Flex>
      <Divider />

      <ScrollArea.Autosize type="scroll" mah="100%" w="100%" mx="auto">
        {data?.map((bot) => (
          <React.Fragment key={bot._id.toString()}>
            <Card p="xs" component={Link} to={`/${bot._id}`} radius="0">
              <Group>
                <Avatar size="lg" />
                <Flex flex={1}>
                  <Stack gap="0" flex={1}>
                    <Text>{bot.title || "asd"}</Text>
                  </Stack>
                </Flex>
              </Group>
            </Card>
            <Divider />
          </React.Fragment>
        ))}
      </ScrollArea.Autosize>
    </Flex>
  );
};
