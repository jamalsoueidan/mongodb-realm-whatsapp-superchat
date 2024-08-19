import { ActionIcon, Affix, rem, ScrollArea, Transition } from "@mantine/core";
import { IconArrowDown } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "wouter";
import { useMessages } from "../../hooks/useMessages";
import { MessageSystem } from "./messages/MesageSystem";
import { MessageImage } from "./messages/MessageImage";
import { MessageInteractive } from "./messages/MessageInteractive";
import { MessageInteractiveReply } from "./messages/MessageInteractiveReply";
import { MessageText } from "./messages/MessageText";
import { MessageUnknown } from "./messages/MessageUnknown";

export function ChatMessages() {
  const { conversationId } = useParams<{ conversationId: string }>();
  const [lastVisibleMessageId, setLastVisibleMessageId] = useState<
    string | null
  >(null);
  const viewport = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const observerTarget = useRef(null);
  const { messages, totalMessageCount, loadMore } = useMessages({
    conversationId,
    perPage: 20,
  });

  const scrollToMessage = (messageId: string) => {
    const element = document.getElementById(messageId);
    if (element) {
      element.scrollIntoView({ behavior: "instant", block: "start" });
    }
  };

  const handleScroll = () => {
    if (viewport.current) {
      const scrollTop = viewport.current.scrollTop;
      const scrollHeight = viewport.current.scrollHeight;
      const clientHeight = viewport.current.clientHeight;

      // Check if user is at the bottom
      setIsAtBottom(scrollTop + clientHeight >= scrollHeight);
    }
  };

  const scrollToBottom = () => {
    if (viewport.current) {
      viewport.current.scrollTo({
        top: viewport.current.scrollHeight,
        behavior: "instant",
      });
    }
  };

  // Load more when user scrolls to the top
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (messages.length < totalMessageCount.length) {
            const firstVisibleMessage = messages[0];
            if (firstVisibleMessage) {
              setLastVisibleMessageId(firstVisibleMessage._id.toString());
            }
            loadMore();
          }
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget, messages, totalMessageCount]);

  // Scroll to last visible message when new messages are added while scrolling up
  useEffect(() => {
    if (lastVisibleMessageId) {
      scrollToMessage(lastVisibleMessageId);
    }
  }, [messages]);

  // Attach scroll event listener to ScrollArea
  useEffect(() => {
    const viewportElement = viewport.current;
    if (viewportElement) {
      viewportElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (viewportElement) {
        viewportElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  // Scroll to bottom onload
  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <>
      <ScrollArea
        type="auto"
        bg="#efeae2"
        px="xs"
        flex="1"
        viewportRef={viewport}
      >
        <div ref={observerTarget}></div>
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
      </ScrollArea>
      <Affix position={{ bottom: 80, right: 15 }}>
        <Transition transition="slide-up" mounted={!isAtBottom}>
          {(transitionStyles) => (
            <ActionIcon
              variant="default"
              style={transitionStyles}
              onClick={() => scrollToBottom()}
              color="white"
              radius="xl"
              size="xl"
            >
              <IconArrowDown style={{ width: rem(24), height: rem(24) }} />
            </ActionIcon>
          )}
        </Transition>
      </Affix>
    </>
  );
}
