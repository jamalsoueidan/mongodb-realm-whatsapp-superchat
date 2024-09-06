import { Checkbox, MultiSelect, Stack } from "@mantine/core";
import { useRealm } from "@realm/react";
import { useCallback, useState } from "react";
import Realm, { BSON } from "realm";
import { useParams } from "wouter";
import { useGetConversation } from "../../../../hooks/useGetConversation";
import { useLoggedInUser } from "../../../../hooks/useLoggedInUser";
import { useUsers } from "../../../../hooks/useUsers";

export const AssignUsers = () => {
  const [checked, setChecked] = useState(false);

  const { conversationId } = useParams<{ conversationId: string }>();
  const realm = useRealm();
  const loggedInUser = useLoggedInUser();
  const conversation = useGetConversation(conversationId);
  const users = useUsers();

  const handleUserSelectionChange = useCallback(
    (selectedUserIds: string[]) => {
      realm.write(() => {
        // Find the users who were added or removed
        const addedUsers = selectedUserIds.filter(
          (id) => !conversation.user_ids.includes(id)
        );
        const removedUsers = conversation.user_ids.filter(
          (id) => !selectedUserIds.includes(id)
        );

        // Update the conversation with the new user_ids
        realm.create(
          "Conversation",
          {
            _id: conversation._id,
            user_ids: selectedUserIds,
          },
          Realm.UpdateMode.Modified
        );

        // Helper function to create a message
        const createSystemMessage = (userId: string, action: string) => {
          const user = users.find((u) => u.user_id === userId);
          if (user) {
            realm.create("Message", {
              _id: new BSON.ObjectId(),
              message_id: "system",
              conversation,
              business_phone_number_id: "364826260050460",
              recipient: conversation.customer_phone_number,
              timestamp: Math.floor(Date.now() / 1000),
              statuses: [],
              type: "system",
              text: {
                body: `<strong>${user.name}</strong> was ${action}.`,
              },
              user: loggedInUser,
            });
          }
        };

        if (checked) {
          // Create messages for added users
          addedUsers.forEach((userId) => createSystemMessage(userId, "added"));

          // Create messages for removed users
          removedUsers.forEach((userId) =>
            createSystemMessage(userId, "removed")
          );
        }
      });
    },
    [checked, conversation, loggedInUser, realm, users]
  );

  return (
    <Stack>
      <MultiSelect
        placeholder="Pick user"
        description="Choose which users can view this conversation?"
        value={conversation?.user_ids.map((user_id) => user_id)}
        data={users.map((u) => ({
          label: u.name,
          value: u.user_id,
        }))}
        size="md"
        onChange={handleUserSelectionChange}
      />
      <Checkbox
        checked={checked}
        onChange={(event) => setChecked(event.currentTarget.checked)}
        label="Send message in the chat"
      />
    </Stack>
  );
};
