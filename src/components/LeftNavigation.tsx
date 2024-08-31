import "@mantine/core/styles.css";
import { Link } from "wouter";

import { ActionIcon, Avatar, Flex, Stack, Tooltip } from "@mantine/core";
import { useRealm } from "@realm/react";
import {
  IconAlarm,
  IconGraph,
  IconInbox,
  IconUsers,
} from "@tabler/icons-react";
import { useRealmUser } from "../hooks/useRealmUser";
import { getInitials } from "../lib/getInitials";
import { SyncProgress } from "./monitor/SyncProgress";

export const LeftNavigation = () => {
  const user = useRealmUser();
  const realm = useRealm();

  return (
    <Flex
      align="flex-start"
      bg="gray.1"
      direction="column"
      justify="space-between"
    >
      <Stack justify="center" align="center" p="md">
        <Tooltip label="Chat" position="bottom">
          <ActionIcon
            variant="transparent"
            color="#555"
            aria-label="Chat"
            radius="xl"
            size="lg"
            component={Link}
            to="/conversation"
          >
            <IconInbox style={{ width: "70%", height: "70%" }} stroke={1.5} />
          </ActionIcon>
        </Tooltip>

        <Tooltip label="Reports">
          <ActionIcon
            variant="transparent"
            color="#555"
            aria-label="Reports"
            radius="xl"
            size="lg"
            component={Link}
            to="/reports"
          >
            <IconGraph style={{ width: "70%", height: "70%" }} stroke={1.5} />
          </ActionIcon>
        </Tooltip>

        <Tooltip label="Team">
          <ActionIcon
            variant="transparent"
            color="#555"
            aria-label="Team"
            radius="xl"
            size="lg"
            component={Link}
            to="/team"
          >
            <IconUsers style={{ width: "70%", height: "70%" }} stroke={1.5} />
          </ActionIcon>
        </Tooltip>

        <Tooltip label="Bot">
          <ActionIcon
            variant="transparent"
            color="#555"
            aria-label="Bot"
            radius="xl"
            size="lg"
            component={Link}
            to="/bot"
          >
            <IconAlarm style={{ width: "70%", height: "70%" }} stroke={1.5} />
          </ActionIcon>
        </Tooltip>
      </Stack>
      <Stack justify="center" align="center" p="md">
        {realm.syncSession ? (
          <SyncProgress syncSession={realm.syncSession} />
        ) : null}
        <Tooltip label="Logout">
          <ActionIcon
            variant="transparent"
            color="#555"
            aria-label="Logout"
            radius="xl"
            size="lg"
            onClick={() => {
              localStorage.removeItem("facebookAccessToken");
              user.logOut();
            }}
          >
            <Avatar color="cyan" radius="xl">
              {getInitials(user.customData.name)}
            </Avatar>
          </ActionIcon>
        </Tooltip>
      </Stack>
    </Flex>
  );
};
