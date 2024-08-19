import { Flex, Stack, Text, Title } from "@mantine/core";
import { IconPhone } from "@tabler/icons-react";
import { Route } from "wouter";
import { Chat } from "../components/conversations/Chat";
import { ConversationList } from "../components/conversations/ConversationList";
import { useMobile } from "../hooks/useMobile";

export const ConversationPage = () => {
  const isMobile = useMobile();

  return (
    <Route path="/conversation/*?">
      {(params) => {
        const openedConversation = !!params["0"];
        return (
          <>
            {!isMobile || !openedConversation ? (
              <Flex bg="white" flex=".5" direction="column">
                <ConversationList />
              </Flex>
            ) : null}

            {!isMobile && !openedConversation ? (
              <Flex
                bg="#f0f2f5"
                flex="1"
                direction="column"
                style={{ overflow: "hidden" }}
                align="center"
                justify="center"
                gap="md"
              >
                <IconPhone size={128} stroke={1} />
                <Title order={3} fw={600}>
                  Select a conversation
                </Title>
                <Stack gap="0">
                  <Text c="gray">
                    Send and receive message s without keeping your phone
                    online.
                  </Text>
                  <Text c="gray">
                    Send and receive message s without keeping your phone
                    online.
                  </Text>
                </Stack>
              </Flex>
            ) : null}

            <Route path="/conversation/:conversationId/*?">
              {() => (!isMobile || openedConversation ? <Chat /> : null)}
            </Route>
          </>
        );
      }}
    </Route>
  );
};
