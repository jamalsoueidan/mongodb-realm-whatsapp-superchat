import { Flex, Stack, Text, Title } from "@mantine/core";
import { IconPhone } from "@tabler/icons-react";
import { Route, Router, Switch, useLocation, useSearch } from "wouter";
import { Chat } from "../components/conversations/Chat";
import { Contacts } from "../components/conversations/Contacts";
import { ConversationList } from "../components/conversations/ConversationList";
import { CustomDrawer } from "../components/CustomDrawer";
import { useMobile } from "../hooks/useMobile";

export const ConversationPage = () => {
  const isMobile = useMobile();
  const [, setLocation] = useLocation();
  const searchString = useSearch();

  return (
    <Router base="/conversation">
      <Route path="/*?">
        <Flex
          bg="white"
          flex={isMobile ? "1" : "0.5"}
          direction="column"
          style={{ border: "1px solid #e4e6eb" }}
        >
          {searchString === "contacts" ? <Contacts /> : <ConversationList />}
        </Flex>
      </Route>

      <Switch>
        <Route path=":conversationId/*?">
          {isMobile ? (
            <CustomDrawer onClose={() => setLocation("/")} opened>
              <Chat />
            </CustomDrawer>
          ) : (
            <Chat />
          )}
        </Route>

        <Route>
          {!isMobile ? (
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
                  Send and receive message s without keeping your phone online.
                </Text>
                <Text c="gray">
                  Send and receive message s without keeping your phone online.
                </Text>
              </Stack>
            </Flex>
          ) : null}
        </Route>
      </Switch>
    </Router>
  );
};
