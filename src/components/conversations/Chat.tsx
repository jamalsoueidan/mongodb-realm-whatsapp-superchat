import { Drawer, Flex } from "@mantine/core";
import React, { useEffect, useMemo } from "react";
import { useLocation, useRoute } from "wouter";
import { useMobile } from "../../hooks/useMobile";
import { useUserConversation } from "../../hooks/useUserConversation";
import { useVisualViewportHeight } from "../../hooks/useVisualViewportHeight";
import { ChatAttachments } from "./ChatAttachments";
import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";
import { ChatMessages } from "./ChatMessages";
import { ChatSettings } from "./ChatSettings";

export const Chat = () => {
  const isMobile = useMobile();
  const [isMatch] = useRoute("/conversation/:conversationId/settings/*?");

  const updateLastSeenAt = useUserConversation();

  const components = useMemo(
    () => (
      <>
        <ChatHeader />
        <ChatMessages />
        <ChatInput />
        <ChatSettings />
        <ChatAttachments />
      </>
    ),
    []
  );

  // In case conversation dont have a scroll, we still need to update the last seen at
  useEffect(() => {
    updateLastSeenAt();
  }, [updateLastSeenAt]);

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
  const viewportHeight = useVisualViewportHeight();

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
          <Flex direction="column" h={`calc(${viewportHeight}px)`}>
            {children}
          </Flex>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
};
