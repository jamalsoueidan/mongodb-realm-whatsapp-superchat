import { Flex } from "@mantine/core";
import { IconInbox, IconUsers } from "@tabler/icons-react";
import { BottomNavigationLink } from "./BottomNavigationLink";

export function BottomNavigation() {
  return (
    <Flex
      align="center"
      justify="space-around"
      py="xs"
      style={{
        backgroundColor: "white",
        boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <BottomNavigationLink to="/conversation" label="Chat" icon={IconInbox} />
      <BottomNavigationLink to="/team" label="Team" icon={IconUsers} />
      <BottomNavigationLink to="/tools" label="Tools" icon={IconUsers} />
      <BottomNavigationLink to="/tools" label="Blah" icon={IconUsers} />
    </Flex>
  );
}
