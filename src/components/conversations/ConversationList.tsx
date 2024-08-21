import { Divider, Flex, ScrollArea, Title } from "@mantine/core";
import { useQuery } from "@realm/react";
import { useRoute } from "wouter";
import { useConversations } from "../../hooks/useConversations";
import { useRealmUser } from "../../hooks/useRealmUser";
import { User, UserSchema } from "../../models/data";
import { ConversationCard } from "./ConversationCard";

export function ConversationList() {
  const { conversations } = useConversations();
  const [, params] = useRoute("/conversation/:conversationId");
  const user = useRealmUser();

  const assignedUsers = useQuery<User>(
    UserSchema.name,
    (collection) =>
      collection.filtered(
        "business_phone_number_ids CONTAINS $0",
        "364826260050460"
      ),
    []
  );

  const myUser = assignedUsers.filter((u) => u.user_id === user.id)[0];

  return (
    <>
      <Flex p="md" h="60px">
        <Title order={3}>Chat {myUser.conversation_ids.length}</Title>
      </Flex>
      <Divider />

      <ScrollArea type="scroll" h="calc(100% - 40px)">
        {conversations.map((conversation) => (
          <ConversationCard
            conversation={conversation}
            key={conversation._id.toJSON()}
            selected={conversation._id.toString() === params?.conversationId}
          />
        ))}
      </ScrollArea>
    </>
  );
}
