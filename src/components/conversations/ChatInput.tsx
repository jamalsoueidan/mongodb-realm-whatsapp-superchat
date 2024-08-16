import { ActionIcon, Flex, Group, Loader, TextInput } from "@mantine/core";
import { getHotkeyHandler } from "@mantine/hooks";
import { IconSend, IconWashDryF } from "@tabler/icons-react";
import { useState } from "react";
import { Link, useParams } from "wouter";
import { useMobile } from "../../hooks/useMobile";
import { useSendMessage } from "../../hooks/useSendMessage";

export function ChatInput() {
  const { conversationId } = useParams<{ conversationId: string }>();
  const [value, setValue] = useState("");
  const isMobile = useMobile();
  const { send, count } = useSendMessage();

  const handler = () => {
    if (value.length > 0) {
      const body = value;
      setValue("");
      send({ ...reply, text: { preview_url: false, body } });
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
        rightSectionWidth={count > 0 ? 72 : 40}
        rightSection={
          <Group gap="xs">
            {count > 0 ? <Loader color="blue" size="sm" /> : <></>}
            <ActionIcon
              variant="transparent"
              component={Link}
              to={`/conversation/${conversationId}/flows`}
              aria-label="Settings"
            >
              <IconWashDryF stroke={1.5} />
            </ActionIcon>
          </Group>
        }
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

//https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages/#reply-to-message
const sendText = {
  messaging_product: "whatsapp",
  recipient_type: "individual",
  to: "4531317428",
  type: "text",
  text: {
    preview_url: true,
    body: "",
  },
};

const reply = {
  messaging_product: "whatsapp",
  context: {
    message_id:
      "wamid.HBgKNDUzMTMxNzQyOBUCABIYIDg2NjVFNTA5OTRBNTM1NTE0NEJFREIwMDE3MDlGNDdCAA==",
  },
  to: "4531317428",
  type: "text",
  text: {
    preview_url: false,
    body: "your-text-message-content",
  },
};
