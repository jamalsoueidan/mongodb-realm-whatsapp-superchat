import { ActionIcon, Flex, Menu, rem, TextInput } from "@mantine/core";
import { getHotkeyHandler } from "@mantine/hooks";
import {
  IconFaceId,
  IconMessageCircle,
  IconPhoto,
  IconPlus,
  IconSend,
} from "@tabler/icons-react";
import { useState } from "react";
import { Link, useParams } from "wouter";
import { useMobile } from "../../hooks/useMobile";
import { useSendMessage } from "../../hooks/useSendMessage";

export function ChatInput() {
  const [value, setValue] = useState("");
  const isMobile = useMobile();
  const { sendText } = useSendMessage();

  const handler = () => {
    if (value.length > 0) {
      const body = value;
      setValue("");
      sendText(body);
    }
  };

  return (
    <Flex
      p={{ md: "xs" }}
      px={{ base: "2px", md: "xs" }}
      pb={{ base: "2px", md: "xs" }}
      h={{ md: "70px" }}
      gap={{ base: "xs", md: "0" }}
      justify="center"
      align="center"
      bg={isMobile ? "#efeae2" : "gray.1"}
    >
      <TextInput
        size="lg"
        placeholder="Type a message"
        radius={isMobile ? "xl" : "md"}
        value={value}
        leftSection={<AttachmentsMenu />}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={getHotkeyHandler([["Enter", handler]])}
        flex={1}
      />
      <ActionIcon
        variant={isMobile ? "filled" : "transparent"}
        color="green"
        radius="xl"
        size="xl"
        onClick={handler}
        aria-label="Send"
      >
        <IconSend
          stroke={1.5}
          color={isMobile ? "white" : "gray"}
          style={{ transform: "rotate(44deg)", width: "70%", height: "70%" }}
        />
      </ActionIcon>
    </Flex>
  );
}

function AttachmentsMenu() {
  const { conversationId } = useParams<{ conversationId: string }>();

  return (
    <Menu shadow="md" width={200} position="top" offset={16} withArrow>
      <Menu.Target>
        <ActionIcon variant="transparent" aria-label="Atachments">
          <IconPlus stroke={1.5} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          leftSection={
            <IconFaceId style={{ width: rem(14), height: rem(14) }} />
          }
          component={Link}
          to={`/${conversationId}/flows`}
        >
          Flows
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconMessageCircle style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Quick replies
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconPhoto style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Gallery
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
