import { Flex } from "@mantine/core";
import { useMemo } from "react";
import { useRoute } from "wouter";
import { useMobile } from "../../hooks/useMobile";
import { ChatBody } from "./chat/ChatBody";
import { ChatEditor } from "./chat/ChatEditor";
import { ChatHeader } from "./chat/ChatHeader";
import { ChatSettings } from "./chat/ChatSettings";

export const Chat = () => {
  const isMobile = useMobile();
  const [isMatch] = useRoute("/:conversationId/settings/*?");

  const components = useMemo(
    () => (
      <>
        <ChatHeader />
        <ChatBody />
        <ChatEditor />
        <ChatSettings />
      </>
    ),
    []
  );

  if (isMobile) {
    return components;
  }

  // on desktop we want to render it in a flex layout
  return (
    <>
      <Flex
        bg="#f0f2f5"
        flex="1"
        style={{
          overflow: "hidden",
          marginRight: isMatch ? "30%" : 0,
          transition: "margin-left 1s ease",
        }}
        direction="column"
      >
        {components}
      </Flex>
    </>
  );
};
