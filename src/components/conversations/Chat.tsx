import { Drawer, Flex, ScrollArea } from "@mantine/core";
import React, { useMemo } from "react";
import { useLocation, useRoute } from "wouter";
import { useMobile } from "../../hooks/useMobile";
import { useVisualViewportHeight } from "../../hooks/useVisualViewportHeight";
import { ChatFlows } from "./ChatFlows";
import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";
import { ChatMessages } from "./ChatMessages";
import { ChatSettings } from "./ChatSettings";
export const Chat = () => {
  const isMobile = useMobile();
  const [isMatch] = useRoute("/conversation/:conversationId/settings/*?");

  const components = useMemo(
    () => (
      <>
        <ChatHeader />
        <ChatMessages />
        <ChatInput />
        <ChatSettings />
        <ChatFlows />
      </>
    ),
    []
  );

  if (isMobile) {
    return <ChatDrawer>{components}</ChatDrawer>;
  }

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
      scrollAreaComponent={ScrollArea.Autosize}
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
