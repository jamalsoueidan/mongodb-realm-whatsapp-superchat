import { Divider, Flex, ScrollArea, Title } from "@mantine/core";
import { useRoute } from "wouter";
import { useConversations } from "../../hooks/useConversations";
import { ConversationCard } from "./ConversationCard";

export function ConversationList() {
  const { conversations } = useConversations();
  const [, params] = useRoute("/conversation/:conversationId");

  return (
    <>
      <Flex p="md" h="60px">
        <Title order={3}>Chat</Title>
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
