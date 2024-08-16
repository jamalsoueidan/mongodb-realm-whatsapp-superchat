import { ScrollArea, Stack } from "@mantine/core";
import { useEffect, useRef } from "react";
import { useParams } from "wouter";
import { useMessages } from "../../hooks/useMessages";
import { MessageSystem } from "./messages-types/MesageSystem";
import { MessageImage } from "./messages-types/MessageImage";
import { MessageInteractive } from "./messages-types/MessageInteractive";
import { MessageInteractiveReply } from "./messages-types/MessageInteractiveReply";
import { MessageText } from "./messages-types/MessageText";
import { MessageUnknown } from "./messages-types/MessageUnknown";

export function ChatMessages() {
  const { conversationId } = useParams<{ conversationId: string }>();

  const viewport = useRef<HTMLDivElement>(null);
  const { messages } = useMessages({
    conversationId,
  });

  const scrollToBottom = () =>
    viewport.current!.scrollTo({
      top: viewport.current!.scrollHeight,
      behavior: "instant",
    });

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      scrollToBottom();
    });

    if (viewport.current) {
      // size changes in the message container
      resizeObserver.observe(viewport.current);
    }

    return () => resizeObserver.disconnect();
  }, [messages]);

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 500);
    scrollToBottom();
  }, []);

  return (
    <ScrollArea type="auto" bg="gray.3" p="xs" flex="1" viewportRef={viewport}>
      <Stack gap="5px">
        {messages.map((msg) => {
          if (msg.type === "text") {
            return <MessageText msg={msg} key={msg._id as any} />;
          } else if (msg.type === "image") {
            return <MessageImage msg={msg} key={msg._id as any} />;
          } else if (msg.type === "interactive" && msg.interactive) {
            return <MessageInteractive msg={msg} key={msg._id as any} />;
          } else if (
            msg.type === "interactive_reply" &&
            msg.interactive_reply
          ) {
            return <MessageInteractiveReply msg={msg} key={msg._id as any} />;
          } else if (msg.type === "system") {
            return <MessageSystem msg={msg} key={msg._id as any} />;
          } else {
            return <MessageUnknown msg={msg} key={msg._id as any} />;
          }
        })}
      </Stack>
    </ScrollArea>
  );
}
