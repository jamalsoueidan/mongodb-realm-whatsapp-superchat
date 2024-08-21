import { Drawer, Flex } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import React, { useMemo } from "react";
import { useLocation, useRoute } from "wouter";
import { useMobile } from "../../hooks/useMobile";
import { ChatAttachments } from "./ChatAttachments";
import { ChatBody } from "./ChatBody";
import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";
import { ChatSettings } from "./ChatSettings";

export const Chat = () => {
  const isMobile = useMobile();
  const [isMatch] = useRoute("/conversation/:conversationId/settings/*?");

  const components = useMemo(
    () => (
      <>
        <ChatHeader />
        <ChatBody />
        <ChatInput />
        <ChatSettings />
        <ChatAttachments />
      </>
    ),
    []
  );

  // on mobile we just want to render it inside a drawer
  if (isMobile) {
    return <ChatDrawer>{components}</ChatDrawer>;
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

const ChatDrawer = ({ children }: { children: React.ReactNode }) => {
  const [, setLocation] = useLocation();
  const { height } = useViewportSize();

  return (
    <Drawer.Root
      position="right"
      size="100%"
      opened
      onClose={() => setLocation("../conversation")}
      lockScroll={false} //fix mobile infinity scroll
    >
      <Drawer.Content>
        <Drawer.Body p="0">
          <Flex direction="column" h={`${height}px`}>
            {children}
          </Flex>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
};
