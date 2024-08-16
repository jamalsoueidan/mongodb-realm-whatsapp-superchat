import {
  ActionIcon,
  Avatar,
  Flex,
  Indicator,
  Popover,
  Text,
  UnstyledButton,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconGripVertical,
  IconUsersGroup,
} from "@tabler/icons-react";
import { Link, useLocation, useParams, useRoute } from "wouter";
import { useGetConversation } from "../../hooks/useGetConversation";
import { useMobile } from "../../hooks/useMobile";
import { useUsersAssignedConversation } from "../../hooks/useUserAssignedConversation";
export function ChatHeader() {
  const [, setLocation] = useLocation();
  const isMobile = useMobile();
  const { conversationId } = useParams<{ conversationId: string }>();
  const [isMatch] = useRoute("/conversation/:conversationId/settings");

  const conversation = useGetConversation(conversationId);
  const receivedDate = new Date(conversation.timestamp * 1000);

  const { assignedUsers } = useUsersAssignedConversation({
    conversationId,
  });

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
      <Flex gap="md">
        <Popover width={200} position="bottom" withArrow shadow="md">
          <Popover.Target>
            <Indicator
              inline
              label={`+${assignedUsers.length}`}
              size={16}
              component={UnstyledButton}
            >
              <IconUsersGroup />
            </Indicator>
          </Popover.Target>
          <Popover.Dropdown>
            {assignedUsers.map((user) => (
              <Flex key={user.user_id} gap="xs" align="center">
                <Text>{user.name}</Text>
              </Flex>
            ))}
          </Popover.Dropdown>
        </Popover>

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
    </Flex>
  );
}
