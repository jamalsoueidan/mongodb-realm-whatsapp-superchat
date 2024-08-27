import {
  Accordion,
  ActionIcon,
  Divider,
  Drawer,
  Flex,
  ScrollArea,
  Title,
} from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { Link, Router, useParams, useRoute } from "wouter";
import { useMobile } from "../../../hooks/useMobile";
import { AssignUsers } from "./settings/AssignUsers";
import { FlowsReply } from "./settings/FlowReply";

export const ChatSettings = () => {
  const isMobile = useMobile();
  const { conversationId } = useParams<{ conversationId: string }>();
  const [isMatch] = useRoute("/:conversationId/settings/*?");

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
              to={`/${conversationId}`}
            >
              <IconX stroke={1.5} />
            </ActionIcon>
          </Flex>

          <Divider />
          <Router base={`/${conversationId}/settings`}>
            <Accordion
              chevronPosition="right"
              variant="default"
              defaultValue="assignments"
            >
              <Accordion.Item value="assignments">
                <Accordion.Control>User assignment</Accordion.Control>
                <Accordion.Panel>
                  <AssignUsers />
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
