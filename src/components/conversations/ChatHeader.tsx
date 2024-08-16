import { ActionIcon, Avatar, Flex, Text } from "@mantine/core";
import { IconArrowLeft, IconGripVertical } from "@tabler/icons-react";
import { Link, useLocation, useParams, useRoute } from "wouter";
import { useGetConversation } from "../../hooks/useGetConversation";
import { useMobile } from "../../hooks/useMobile";

export function ChatHeader() {
  const [, setLocation] = useLocation();
  const isMobile = useMobile();
  const { conversationId } = useParams<{ conversationId: string }>();
  const [isMatch] = useRoute("/conversation/:conversationId/settings");

  const conversation = useGetConversation(conversationId);
  const receivedDate = new Date(conversation.timestamp * 1000);

  return (
    <Flex
      px="sm"
      py="xs"
      h="60px"
      align="center"
      bg={isMobile ? "green.9" : undefined}
      justify="space-between"
    >
      <Flex gap="xs" align="center">
        {isMobile ? (
          <ActionIcon
            variant="transparent"
            aria-label="Back"
            color="white"
            onClick={() => setLocation("/conversation")}
          >
            <IconArrowLeft stroke={2.5} />
          </ActionIcon>
        ) : null}

        <Avatar color="white" radius="xl" bg="gray.1" size="md" />
        <Flex direction="column" gap="0">
          <Text fw="bold" lh="xs">
            {conversation.name || conversation.customer_phone_number}{" "}
          </Text>
          <Text lh="xs">{receivedDate.toLocaleDateString()}</Text>
        </Flex>
      </Flex>
      <ActionIcon
        variant="transparent"
        aria-label="Back"
        color="black"
        component={Link}
        to={
          !isMatch
            ? `/conversation/${conversation._id}/settings`
            : `/conversation/${conversation._id}`
        }
      >
        <IconGripVertical stroke={2.5} />
      </ActionIcon>
    </Flex>
  );
}
