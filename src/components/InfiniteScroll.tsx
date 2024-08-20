import {
  ActionIcon,
  Affix,
  Indicator,
  rem,
  ScrollArea,
  Transition,
} from "@mantine/core";
import { IconArrowDown } from "@tabler/icons-react";
import {
  forwardRef,
  ReactNode,
  useCallback,
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
    onScroll?: (viewport: HTMLDivElement) => void;
  }
>(({ data, totalData, loadMore, children, key, onScroll }, ref) => {
  const [lastVisibleMessageId, setLastVisibleMessageId] = useState<
    string | null
  >(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const viewport = useRef<HTMLDivElement>(null);

  // Use useImperativeHandle to expose the ref
  useImperativeHandle(ref, () => viewport.current as HTMLDivElement);
  const observerTarget = useRef(null);

  const scrollToMessage = useCallback((messageId: string) => {
    const element = document.getElementById(messageId);
    if (element) {
      element.scrollIntoView({ behavior: "instant", block: "start" });
    }
  }, []);

  const scrollToBottom = useCallback(() => {
    if (viewport.current) {
      viewport.current.scrollTo({
        top: viewport.current.scrollHeight,
        behavior: "instant",
      });
    }
  }, []);

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
      console.log("scrollToMessage", lastVisibleMessageId);
      scrollToMessage(lastVisibleMessageId);
    }
  }, [lastVisibleMessageId, scrollToMessage]);

  // Attach scroll event listener to ScrollArea
  useEffect(() => {
    const handleScroll = () => {
      if (viewport.current) {
        const scrollTop = viewport.current.scrollTop;
        const scrollHeight = viewport.current.scrollHeight;
        const clientHeight = viewport.current.clientHeight;

        // Check if user is at the bottom
        setIsAtBottom(scrollTop + clientHeight >= scrollHeight);
        if (onScroll) {
          onScroll(viewport.current);
        }
      }
    };

    const viewportElement = viewport.current;
    viewportElement?.addEventListener("scroll", handleScroll);

    return () => {
      viewportElement?.removeEventListener("scroll", handleScroll);
    };
  }, [onScroll]);

  // Scroll to bottom onload
  useEffect(() => {
    scrollToBottom();
  }, [key, scrollToBottom]);

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
            <Indicator
              position="top-start"
              offset={7}
              inline
              label="1"
              color="green"
              size={18}
            >
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
            </Indicator>
          )}
        </Transition>
      </Affix>
    </>
  );
});

InfiniteScroll.displayName = "InfiniteScroll";
