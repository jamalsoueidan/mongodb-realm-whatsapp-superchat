import {
  ActionIcon,
  Card,
  CloseButton,
  Divider,
  Flex,
  Group,
  Input,
  ScrollArea,
  Text,
  Title,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { useContacts } from "../../hooks/useContacts";
import { ContactCard } from "./ContactCard";

export function Contacts() {
  const [location, setLocation] = useLocation();
  const [value, setValue] = useState("");
  const groupedContacts = useContacts(value);

  const keys = Object.keys(groupedContacts);

  return (
    <>
      <Flex p="md" h="60px" justify="space-between" align="center" gap="xs">
        <Group>
          <ActionIcon
            onClick={() => setLocation(location)}
            variant="transparent"
            color="#666"
          >
            <IconArrowLeft stroke="1.5" />
          </ActionIcon>

          <Title order={4}>New Chat</Title>
        </Group>
      </Flex>
      <Input
        placeholder="Type name contact"
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        rightSectionPointerEvents="all"
        mx="md"
        mb="md"
        rightSection={
          <CloseButton
            aria-label="Clear input"
            onClick={() => setValue("")}
            style={{ display: value ? undefined : "none" }}
          />
        }
      />
      <Divider />

      <ScrollArea type="scroll" h="calc(100% - 40px)">
        {keys.sort().map((char) => (
          <>
            <Card py="xs" px="lg" mr="xs" radius="0">
              <Title order={4} c="green">
                {char}
              </Title>
            </Card>
            {groupedContacts[char].map((contact) => (
              <ContactCard conversation={contact} key={contact._id.toJSON()} />
            ))}
          </>
        ))}
        {keys.length === 0 ? (
          <Flex justify="center" p="xl">
            <Text c="dimmed">No results found for &apos;{value}&apos;</Text>
          </Flex>
        ) : null}
      </ScrollArea>
    </>
  );
}
