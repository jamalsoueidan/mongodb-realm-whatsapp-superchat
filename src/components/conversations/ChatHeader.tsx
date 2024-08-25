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
import { Link, useParams, useRoute } from "wouter";
import { useGetConversation } from "../../hooks/useGetConversation";
import { useMobile } from "../../hooks/useMobile";
export function ChatHeader() {
  const isMobile = useMobile();
  const { conversationId } = useParams<{ conversationId: string }>();
  const [isMatch] = useRoute("/conversation/:conversationId/settings");

  const conversation = useGetConversation(conversationId);
  const receivedDate = new Date(conversation?.timestamp || 0 * 1000);

  return (
    <Flex
      px="sm"
      py="xs"
      h="60px"
      align="center"
      bg={{ base: "#3a5664", md: "#f0f2f5" }}
      justify="space-between"
    >
      <Flex gap="0" align="center">
        <ActionIcon
          variant="transparent"
          aria-label="Back"
          color="white"
          component={Link}
          to="/"
          hiddenFrom="md"
        >
          <IconArrowLeft stroke={2.5} />
        </ActionIcon>
        <Flex gap="xs">
          <Avatar color="white" radius="xl" bg="gray.1" size="md" />
          <Flex direction="column" gap="0">
            <Text lh="xs" c={{ base: "white", md: "black" }}>
              {conversation?.name || conversation?.customer_phone_number}{" "}
            </Text>
            <Text lh="xs" fz="xs" c={{ base: "white", md: "black" }}>
              {receivedDate.toLocaleDateString()}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex gap="md" align="center">
        <Popover
          middlewares={{ flip: true, shift: true, inline: true }}
          position="bottom"
          withArrow
          shadow="md"
        >
          <Popover.Target>
            <Indicator
              label={`+${conversation?.user_ids.length}`}
              size={16}
              color={isMobile ? "#3a5664" : "#54656f"}
              mt="4px"
              component={UnstyledButton}
            >
              <IconUsersGroup color={isMobile ? "white" : "#54656f"} />
            </Indicator>
          </Popover.Target>
        </Popover>

        <ActionIcon
          variant="transparent"
          aria-label="Back"
          color={isMobile ? "white" : "#54656f"}
          component={Link}
          to={
            !isMatch
              ? `/${conversation?._id}/settings`
              : `/${conversation?._id}`
          }
        >
          <IconGripVertical stroke={2.5} />
        </ActionIcon>
      </Flex>
    </Flex>
  );
}
