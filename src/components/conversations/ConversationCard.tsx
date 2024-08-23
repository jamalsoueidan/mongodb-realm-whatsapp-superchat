import {
  Avatar,
  Badge,
  Card,
  Divider,
  Flex,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import Realm from "realm";
import { Link } from "wouter";
import { useCountUnreadMessages } from "../../hooks/useCountUnreadMessages";
import { useLastMessageConversation } from "../../hooks/useLastMessageConversation";
import { Conversation } from "../../models/data";

export const ConversationCard = ({
  conversation,
  selected,
}: {
  conversation: Conversation & Realm.Object<Conversation>;
  selected: boolean;
}) => {
  const message = useLastMessageConversation(conversation);
  const receivedDate = new Date(conversation.timestamp * 1000);
  const unreadMessageCount = useCountUnreadMessages(conversation);

  return (
    <>
      <Card
        p="xs"
        mr="xs"
        component={Link}
        to={`/conversation/${conversation._id}`}
        bg={selected ? "gray.1" : undefined}
        radius="0"
      >
        <Group>
          <Avatar size="lg" />
          <Flex flex={1}>
            <Stack gap="0" flex={1}>
              <Text>{conversation.name}</Text>
              {message ? (
                <Text lineClamp={1}>
                  {truncateText(
                    message.text?.body ||
                      message.interactive?.body?.text ||
                      message.interactive_reply?.flow_name ||
                      "",
                    25 // Set the maximum length (e.g., 100 characters)
                  )}
                </Text>
              ) : null}
            </Stack>
            <Stack align="flex-end" justify="center" gap="2px">
              <Text c="green" size="xs" fw="500">
                {receivedDate.toLocaleTimeString().substring(0, 5)}
              </Text>
              {unreadMessageCount > 0 && (
                <Badge color="green" size="md" radius="200px" p="7px">
                  {unreadMessageCount}
                </Badge>
              )}
            </Stack>
          </Flex>
        </Group>
      </Card>
      <Divider p="0" m="0" mr="xs" />
    </>
  );
};

const truncateText = (text: string, maxLength: number): string => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};
