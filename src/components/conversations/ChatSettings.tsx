import {
  ActionIcon,
  Box,
  Divider,
  Drawer,
  Flex,
  MultiSelect,
  ScrollArea,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRealm } from "@realm/react";
import { IconX } from "@tabler/icons-react";
import Realm from "realm";
import { Link, useParams, useRoute } from "wouter";
import { useMobile } from "../../hooks/useMobile";
import { useUsersAssignedConversation } from "../../hooks/useUserAssignedConversation";

export const ChatSettings = () => {
  const isMobile = useMobile();
  const { conversationId } = useParams<{ conversationId: string }>();
  const [isMatch] = useRoute("/conversation/:conversationId/settings");

  return (
    <Drawer.Root
      position="right"
      size={isMobile ? "100%" : "30%"}
      opened={isMatch}
      onClose={() => {}}
      scrollAreaComponent={ScrollArea.Autosize}
    >
      <Drawer.Content>
        <Drawer.Body p="0">
          <Flex px="sm" py="xs" h="60px" align="center" justify="space-between">
            <Title order={4}>Settings</Title>

            <ActionIcon
              variant="transparent"
              aria-label="Back"
              color="black"
              component={Link}
              to={`/conversation/${conversationId}`}
            >
              <IconX stroke={1.5} />
            </ActionIcon>
          </Flex>
          <Divider />
          <Box p="sm">
            <Assigned />
          </Box>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
};

function Assigned() {
  const { conversationId } = useParams<{ conversationId: string }>();
  const [opened, { toggle }] = useDisclosure(false);

  const realm = useRealm();

  const { users, assignedUsers, unassignedUsers } =
    useUsersAssignedConversation(
      {
        conversationId,
      },
      [opened]
    );

  const handleUserSelectionChange = (selectedUserIds: string[]) => {
    realm.write(() => {
      // First, remove all unselected users from the conversation
      users.forEach((user) => {
        const userId = user.user_id;

        if (!selectedUserIds.includes(userId)) {
          // If the user is not in the selectedUserIds, remove the conversation ID from their list
          const conversationIdIndex = user.conversation_ids.findIndex((id) =>
            id.equals(new Realm.BSON.ObjectId(conversationId))
          );
          if (conversationIdIndex !== -1) {
            user.conversation_ids.remove(conversationIdIndex);
          }
        } else {
          // If the user is in selectedUserIds, add the conversation ID if it's not already there
          if (
            !user.conversation_ids.some((id) =>
              id.equals(new Realm.BSON.ObjectId(conversationId))
            )
          ) {
            user.conversation_ids.push(new Realm.BSON.ObjectId(conversationId));
          }
        }
      });
    });
    toggle();
  };

  return (
    <MultiSelect
      label="Assigned"
      placeholder="Part of this conversation"
      value={assignedUsers.map((u) => u.name)}
      data={unassignedUsers.map((u) => ({
        label: u.name,
        value: u.user_id,
      }))}
      onChange={handleUserSelectionChange}
    />
  );
}
