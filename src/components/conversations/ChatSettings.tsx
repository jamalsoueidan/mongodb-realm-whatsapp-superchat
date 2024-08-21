import {
  Accordion,
  ActionIcon,
  Button,
  Checkbox,
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
import { useCallback, useState } from "react";
import { Realm } from "realm";
import { Link, Router, useParams, useRoute } from "wouter";
import { useGetConversation } from "../../hooks/useGetConversation";
import { useLoggedInUser } from "../../hooks/useLoggedInUser";
import { useMobile } from "../../hooks/useMobile";
import { useUsers } from "../../hooks/useUsers";
import { Message, MessageSchema } from "../../models/data";
export const ChatSettings = () => {
  const isMobile = useMobile();
  const { conversationId } = useParams<{ conversationId: string }>();
  const [isMatch] = useRoute("/conversation/:conversationId/settings/*?");

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
          <Router base={`/conversation/${conversationId}/settings`}>
            <Accordion
              chevronPosition="right"
              variant="default"
              defaultValue="assignments"
            >
              <Accordion.Item value="assignments">
                <Accordion.Control>User assignment</Accordion.Control>
                <Accordion.Panel>
                  <Assigned />
                </Accordion.Panel>
              </Accordion.Item>
              <Accordion.Item value="flows">
                <Accordion.Control>
                  Flows replies (newest top)
                </Accordion.Control>
                <Accordion.Panel>
                  <FlowsReply />
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Router>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
};

function Assigned() {
  const [checked, setChecked] = useState(false);
  const [changed, { toggle }] = useDisclosure(false);
  const { conversationId } = useParams<{ conversationId: string }>();
  const realm = useRealm();
  const user = useLoggedInUser();
  const conversation = useGetConversation(conversationId);
  const { users } = useUsers([changed]);

  const handleUserSelectionChange = useCallback(
    (selectedUserIds: string[]) => {
      realm.write(() => {
        users.forEach((u) => {
          const index = u.conversation_ids.findIndex((id) =>
            id.equals(conversation._id)
          );

          if (selectedUserIds.includes(u.user_id)) {
            if (index === -1) {
              //must not exist before
              u.conversation_ids.push(conversation._id);
              u.updated_at = Math.floor(Date.now() / 1000);
              if (checked) {
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
                    body: `<strong>${u.name}</strong> is added.`,
                  },
                  user,
                });
              }
            }
          } else {
            if (index !== -1) {
              //must exit before
              u.conversation_ids.remove(index);
              u.updated_at = Math.floor(Date.now() / 1000);
              if (checked) {
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
                    body: `<strong>${u.name}</strong> was removed.`,
                  },
                  user,
                });
              }
            }
          }
        });
      });
      toggle();
    },
    [checked, conversation, realm, toggle, user, users]
  );

  return (
    <Stack>
      <MultiSelect
        placeholder="Pick user"
        description="Choose which users can view this conversation?"
        value={users
          .filtered(
            "$0 IN conversation_ids",
            new Realm.BSON.ObjectId(conversationId)
          )
          .map((u) => u.user_id)}
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
}

function FlowsReply() {
  //TODO:
  // show only last 24 hours, or last 7 days?
  const { conversationId } = useParams<{ conversationId: string }>();
  const conversation = useGetConversation(conversationId);

  const flows = useQuery<Message>(MessageSchema.name, (collection) =>
    collection.filtered(
      "type = 'interactive_reply' AND reply != $0 AND conversation == $1",
      null,
      conversation
    )
  );

  return flows.length > 0 ? (
    <ScrollArea type="always" pr="md" flex="1" h="300px">
      <Stack>
        {flows.map((flow) => {
          const receivedDate = new Date(flow.timestamp * 1000);

          return (
            <Flex key={flow._id.toJSON()} direction="column">
              <Flex justify="space-between" align="center">
                <div>
                  <Text fw="500">{flow?.interactive_reply?.flow_name}</Text>
                  <Text>{receivedDate.toLocaleString()}</Text>
                </div>
                <Button
                  size="compact-md"
                  component={Link}
                  to={`/${flow._id.toJSON()}`}
                >
                  View
                </Button>
              </Flex>
            </Flex>
          );
        })}
      </Stack>
    </ScrollArea>
  ) : (
    <Text fw="bold">No flows send to the user yet!</Text>
  );
}
