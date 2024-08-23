import "@mantine/core/styles.css";
import { Link } from "wouter";

import { ActionIcon, Avatar, Flex, Stack, Tooltip } from "@mantine/core";
import { useRealm } from "@realm/react";
import { IconGraph, IconInbox } from "@tabler/icons-react";
import { useRealmUser } from "../hooks/useRealmUser";
import { getInitials } from "../lib/getInitials";
import { SyncProgress } from "./monitor/SyncProgress";

export const LeftNavigation = () => {
  const user = useRealmUser();
  const realm = useRealm();

  return (
    <Flex align="flex-start" bg="gray.1">
      <Stack justify="center" align="center" p="md">
        <Tooltip label="Conversations" position="bottom">
          <ActionIcon
            variant="transparent"
            color="#555"
            aria-label="Conversations"
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
        {realm.syncSession ? (
          <SyncProgress syncSession={realm.syncSession} />
        ) : null}
      </Stack>
    </Flex>
  );
};
