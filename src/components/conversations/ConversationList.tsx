import { ActionIcon, Divider, Flex, ScrollArea, Title } from "@mantine/core";
import { IconCirclePlus } from "@tabler/icons-react";
import { useLocation, useRoute } from "wouter";
import { useConversations } from "../../hooks/useConversations";
import { ConversationCard } from "./ConversationCard";

export function ConversationList() {
  const { conversations } = useConversations();
  const [location, setLocation] = useLocation();
  const [, params] = useRoute("/:conversationId");

  return (
    <>
      <Flex p="md" h="60px" justify="space-between" align="center" gap="xs">
        <Title order={3}>Chat</Title>
        <ActionIcon
          onClick={() => setLocation(`${location}?contacts`)}
          variant="transparent"
          color="#666"
          size="lg"
        >
          <IconCirclePlus
            stroke="1.5"
            style={{ width: "100%", height: "100%" }}
          />
        </ActionIcon>
      </Flex>
      <Divider />

      <ScrollArea type="scroll" h="calc(100% - 40px)">
        {conversations?.map((conversation) => (
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
