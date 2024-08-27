import { ActionIcon, Flex, Menu, Title, rem } from "@mantine/core";
import {
  IconGraph,
  IconInbox,
  IconLogout,
  IconMenu2,
  IconUsers,
} from "@tabler/icons-react";
import { Link } from "wouter";
import { useRealmUser } from "../hooks/useRealmUser";

export function TopNavigation() {
  const user = useRealmUser();

  return (
    <Flex
      justify="space-between"
      align="center"
      pl="md"
      h="60px"
      w="100&"
      bg={{ base: "#3a5664", md: "white" }}
    >
      <Title order={2} c="white" fw="500">
        WA Business
      </Title>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <ActionIcon aria-label="Menu" size="xl" variant="transparent">
            <IconMenu2
              style={{ width: "70%", height: "70%" }}
              stroke={1.5}
              color="white"
            />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Application</Menu.Label>
          <Menu.Item
            leftSection={
              <IconInbox style={{ width: rem(14), height: rem(14) }} />
            }
            component={Link}
            to="/conversation"
          >
            Chat
          </Menu.Item>
          <Menu.Item
            leftSection={
              <IconGraph style={{ width: rem(14), height: rem(14) }} />
            }
            component={Link}
            to="/reports"
          >
            Reports
          </Menu.Item>
          <Menu.Item
            leftSection={
              <IconUsers style={{ width: rem(14), height: rem(14) }} />
            }
            component={Link}
            to="/team"
          >
            Team
          </Menu.Item>
          <Menu.Item
            leftSection={
              <IconLogout style={{ width: rem(14), height: rem(14) }} />
            }
            onClick={() => {
              localStorage.removeItem("facebookAccessToken");
              user.logOut();
            }}
          >
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Flex>
  );
}
