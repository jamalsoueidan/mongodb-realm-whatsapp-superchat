import "@mantine/core/styles.css";

import { ActionIcon, Avatar, Flex, Stack, Tooltip } from "@mantine/core";
import { useRealm } from "@realm/react";
import {
  IconBinaryTree2,
  IconGraph,
  IconInbox,
  IconUsers,
} from "@tabler/icons-react";
import { useRealmUser } from "../hooks/useRealmUser";
import { getInitials } from "../lib/getInitials";
import { LeftNavigationLink } from "./LeftNavigationLink";
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
        <LeftNavigationLink label="Chat" icon={IconInbox} to="/conversation" />
        <LeftNavigationLink label="Reports" icon={IconGraph} to="/reports" />
        <LeftNavigationLink label="Team" icon={IconUsers} to="/team" />
        <LeftNavigationLink label="Bots" icon={IconBinaryTree2} to="/bot" />
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
