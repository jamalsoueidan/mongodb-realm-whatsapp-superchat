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
import { useQuery, useRealm } from "@realm/react";
import { IconX } from "@tabler/icons-react";
import { useMemo } from "react";
import Realm from "realm";
import { Link, useParams, useRoute } from "wouter";
import { useMobile } from "../../hooks/useMobile";
import { User, UserSchema } from "../../models/data";

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
  const realm = useRealm();

  const users = useQuery<User>(
    UserSchema.name,
    (collection) =>
      collection.filtered(
        "business_phone_number_ids CONTAINS $0",
        "364826260050460"
      ),
    []
  );

  const { assignedUsers, unassignedUsers } = useMemo(() => {
    const assigned: User[] = [];
    const unassigned: User[] = [];

    users.forEach((user) => {
      if (
        user.conversation_ids.some((id) =>
          id.equals(new Realm.BSON.ObjectId(conversationId))
        )
      ) {
        assigned.push(user);
      } else {
        unassigned.push(user);
      }
    });

    return { assignedUsers: assigned, unassignedUsers: unassigned };
  }, [users, conversationId]);

  const handleUserSelectionChange = (selectedUserIds: string[]) => {
    realm.write(() => {
      // First, remove all unselected users from the conversation
      users.forEach((user) => {
        const userId = user._id;

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
  };

  return (
    <MultiSelect
      label="Assigned"
      placeholder="Part of this conversation"
      value={assignedUsers.map((u) => u.name)}
      data={unassignedUsers.map((u) => ({
        label: u.name,
        value: u._id,
      }))}
      onChange={handleUserSelectionChange}
    />
  );
}
