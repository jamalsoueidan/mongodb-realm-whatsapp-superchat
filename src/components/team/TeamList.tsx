import { Divider, Flex, ScrollArea, Title } from "@mantine/core";
import { IconUsers } from "@tabler/icons-react";
import { useRoute } from "wouter";
import { useUsers } from "../../hooks/useUsers";
import { TeamUserCard } from "./TeamUserCard";

export function TeamList() {
  const { users } = useUsers();
  const [, params] = useRoute("/team/:userId");

  return (
    <>
      <Flex p="md" h="60px" align="center" gap="xs">
        <IconUsers size={24} />
        <Title order={3}>Team members</Title>
      </Flex>
      <Divider />

      <ScrollArea type="scroll" h="calc(100% - 40px)">
        {users?.map((user) => (
          <TeamUserCard
            user={user}
            key={user._id.toJSON()}
            selected={user._id.toString() === params?.userId}
          />
        ))}
      </ScrollArea>
    </>
  );
}
