import "@mantine/core/styles.css";
import { useUser } from "@realm/react";
import { Link } from "wouter";

import { ActionIcon, Avatar, Flex, Stack, Tooltip } from "@mantine/core";
import { IconGraph, IconInbox } from "@tabler/icons-react";
import { getInitials } from "../lib/getInitials";

export const LeftNavigation = () => {
  const user = useUser();

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
              {getInitials((user.customData as any).name)}
            </Avatar>
          </ActionIcon>
        </Tooltip>
      </Stack>
    </Flex>
  );
};
