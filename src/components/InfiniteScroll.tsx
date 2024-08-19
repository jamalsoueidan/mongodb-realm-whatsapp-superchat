import { ActionIcon, Affix, rem, ScrollArea, Transition } from "@mantine/core";
import { IconArrowDown } from "@tabler/icons-react";
import {
  forwardRef,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Object, Results } from "realm";
import { Message } from "../models/data";

export const InfiniteScroll = forwardRef<
  HTMLDivElement | null,
  {
    key: string;
    data: Results<Message & Object<Message>>;
    totalData: number;
    loadMore: () => void;
    children: ReactNode;
  }
>(({ data, totalData, loadMore, children, key }, ref) => {
  const [lastVisibleMessageId, setLastVisibleMessageId] = useState<
    string | null
  >(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const viewport = useRef<HTMLDivElement>(null);

  // Use useImperativeHandle to expose the ref
  useImperativeHandle(ref, () => viewport.current as HTMLDivElement);
  const observerTarget = useRef(null);

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
          if (data.length < totalData) {
            const firstVisibleMessage = data[0];
            if (firstVisibleMessage) {
              setLastVisibleMessageId(firstVisibleMessage._id.toString());
            }
            loadMore();
          }
        }
      },
      { threshold: 1 }
    );

    // Store the current ref value in a local variable
    const currentTarget = observerTarget.current;

    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [observerTarget, data, totalData, loadMore]);

  // Scroll to last visible message when new messages are added while scrolling up
  useEffect(() => {
    if (lastVisibleMessageId) {
      scrollToMessage(lastVisibleMessageId);
    }
  }, [lastVisibleMessageId]);

  // Attach scroll event listener to ScrollArea
  useEffect(() => {
    const viewportElement = viewport.current;
    viewportElement?.addEventListener("scroll", handleScroll);

    return () => {
      viewportElement?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll to bottom onload
  useEffect(() => {
    scrollToBottom();
  }, [key]);

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
        {children}
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
});

InfiniteScroll.displayName = "InfiniteScroll";
