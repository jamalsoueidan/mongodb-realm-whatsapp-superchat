import {
  Accordion,
  ActionIcon,
  Button,
  Divider,
  Drawer,
  Flex,
  MultiSelect,
  ScrollArea,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery, useRealm } from "@realm/react";
import { IconX } from "@tabler/icons-react";
import Realm from "realm";
import { Link, useParams, useRoute } from "wouter";
import { useGetConversation } from "../../hooks/useGetConversation";
import { useMobile } from "../../hooks/useMobile";
import { useUsersAssignedConversation } from "../../hooks/useUserAssignedConversation";
import { Message, MessageSchema } from "../../models/data";

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
          <Accordion chevronPosition="right" variant="default">
            <Accordion.Item value="assignments">
              <Accordion.Control>User assignment</Accordion.Control>
              <Accordion.Panel>
                <Assigned />
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value="flows">
              <Accordion.Control>Flows replies (newest top)</Accordion.Control>
              <Accordion.Panel>
                <FlowsReply />
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
};

function Assigned() {
  const { conversationId } = useParams<{ conversationId: string }>();
  const [opened, { toggle }] = useDisclosure(false);

  const realm = useRealm();

  const conversation = useGetConversation(conversationId);
  const { users, assignedUsers, unassignedUsers } =
    useUsersAssignedConversation(
      {
        conversationId,
      },
      [opened]
    );

  const handleUserSelectionChange = (selectedUserIds: string[]) => {
    console.log(selectedUserIds);
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
            realm.create("Message", {
              _id: new Realm.BSON.ObjectId(),
              message_id: "system",
              conversation,
              business_phone_number_id: "364826260050460",
              recipient: conversation.customer_phone_number,
              timestamp: Math.floor(Date.now() / 1000),
              statuses: [],
              type: "system",
              text: {
                body: `<strong>${user.name}</strong> was removed from this conversation.`,
              },
            });
          }
        } else {
          // If the user is in selectedUserIds, add the conversation ID if it's not already there
          if (
            !user.conversation_ids.some((id) =>
              id.equals(new Realm.BSON.ObjectId(conversationId))
            )
          ) {
            user.conversation_ids.push(new Realm.BSON.ObjectId(conversationId));
            realm.create("Message", {
              _id: new Realm.BSON.ObjectId(),
              message_id: "system",
              conversation,
              business_phone_number_id: "364826260050460",
              recipient: conversation.customer_phone_number,
              timestamp: Math.floor(Date.now() / 1000),
              statuses: [],
              type: "system",
              text: {
                body: `<strong>${user.name}</strong> is assigned to this conversation.`,
              },
            });
          }
        }
      });
    });
    toggle();
  };

  return (
    <MultiSelect
      placeholder="Pick user"
      description="Choose which users can view this conversation?"
      value={assignedUsers.map((u) => u.user_id)}
      data={users.map((u) => ({
        label: u.name,
        value: u.user_id,
      }))}
      size="md"
      onChange={handleUserSelectionChange}
    />
  );
}

function FlowsReply() {
  //TODO:
  // show only last 24 hours, or last 7 days?

  const flows = useQuery<Message>(MessageSchema.name, (collection) =>
    collection.filtered("type = 'interactive_reply' AND reply != $0", null)
  );

  return (
    <Stack>
      {flows.map((f) => {
        const flowOwner = f.reply;
        const receivedDate = new Date(f.timestamp * 1000);

        return (
          <Flex key={f._id.toJSON()} direction="column">
            <Flex justify="space-between" align="center">
              <div>
                <Text fw="500">{flowOwner?.interactive?.metadata?.name}</Text>
                <Text>{receivedDate.toLocaleString()}</Text>
              </div>
              <Button size="compact-md">View</Button>
            </Flex>
          </Flex>
        );
      })}
    </Stack>
  );
}
