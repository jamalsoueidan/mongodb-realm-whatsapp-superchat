import { Avatar, Card, Divider, Flex, Group, Stack, Text } from "@mantine/core";
import dayjs from "dayjs";
import Realm from "realm";
import { Link } from "wouter";
import { Conversation } from "../../models/data";

export const ContactCard = ({
  conversation,
}: {
  conversation: Conversation & Realm.Object<Conversation>;
}) => {
  const timestamp = dayjs((conversation?.timestamp || 0) * 1000);

  return (
    <>
      <Card p="xs" component={Link} to={`/${conversation._id}`} radius="0">
        <Group w="100%">
          <Avatar size="md" />
          <Stack flex={1}>
            <Flex justify="space-between" align="center">
              <Text>{conversation.name}</Text>
              <Text c="green" size="xs" fw="500">
                {timestamp.fromNow()}
              </Text>
            </Flex>
            <Divider />
          </Stack>
        </Group>
      </Card>
    </>
  );
};
