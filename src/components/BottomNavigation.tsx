import { Flex } from "@mantine/core";
import { IconAlarm, IconInbox, IconUsers } from "@tabler/icons-react";
import { BottomNavigationLink } from "./BottomNavigationLink";

export function BottomNavigation() {
  return (
    <Flex
      align="center"
      justify="space-around"
      h="80px"
      style={{
        backgroundColor: "white",
        boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
        zIndex: 100,
      }}
    >
      <BottomNavigationLink to="/conversation" label="Chat" icon={IconInbox} />
      <BottomNavigationLink to="/team" label="Team" icon={IconUsers} />
      <BottomNavigationLink to="/trigger" label="Trigger" icon={IconAlarm} />
      <BottomNavigationLink to="/tools" label="Blah" icon={IconUsers} />
    </Flex>
  );
}
