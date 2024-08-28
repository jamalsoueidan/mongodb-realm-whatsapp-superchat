import { Divider, Flex, ScrollArea, Title } from "@mantine/core";
import { useRoute } from "wouter";
import { useUsers } from "../../hooks/useUsers";
import { TeamUserCard } from "./TeamUserCard";

export function TeamList() {
  const users = useUsers();
  const [, params] = useRoute("/team/:userId");

  return (
    <>
      <Flex p="md" h="60px" align="center" gap="xs">
        <Title order={3}>Team members</Title>
      </Flex>
      <Divider />

      <ScrollArea.Autosize type="scroll" mah="100%" w="100%" mx="auto">
        {users?.map((user) => (
          <TeamUserCard
            user={user}
            key={user._id.toJSON()}
            selected={user._id.toString() === params?.userId}
          />
        ))}
      </ScrollArea.Autosize>
    </>
  );
}
