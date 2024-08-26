import { ScrollArea, ScrollAreaProps } from "@mantine/core";
import { useThrottledCallback } from "@mantine/hooks";
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
import { useScroll } from "./providers/ScrollProvider";

export const InfiniteScroll = forwardRef<
  HTMLDivElement | null,
  {
    conversationId: string; //this is important so we know when we require to rerun the useeffect for scroll-to-bottom-or-such
    data: Results<Message & Object<Message>>;
    totalData: number;
    loadMore: () => void;
    children: ReactNode;
  } & ScrollAreaProps
>(({ data, totalData, loadMore, children, conversationId, ...props }, ref) => {
  const { setScrollPosition } = useScroll();
  const throttledSetScrollPosition = useThrottledCallback((value) => {
    setScrollPosition(value);
    if (props.onScrollPositionChange) {
      props.onScrollPositionChange(value);
    }
  }, 500);

  const [lastVisibleMessageId, setLastVisibleMessageId] = useState<
    string | null
  >(null);
  const viewport = useRef<HTMLDivElement>(null);

  // Use useImperativeHandle to expose the ref
  useImperativeHandle(ref, () => viewport.current as HTMLDivElement);

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
  const onTopReached = useCallback(() => {
    if (data.length < totalData) {
      const firstVisibleMessage = data[0];
      if (firstVisibleMessage) {
        setLastVisibleMessageId(firstVisibleMessage._id.toString());
      }
      loadMore();
    }
    if (props.onTopReached) {
      props.onTopReached();
    }
  }, [data, totalData, props, loadMore]);

  const onBottomReached = useCallback(() => {
    if (props.onBottomReached) {
      props.onBottomReached();
    }
  }, [props]);

  // Scroll to last visible message when load more is called
  useEffect(() => {
    if (lastVisibleMessageId) {
      scrollToMessage(lastVisibleMessageId);
    }
  }, [lastVisibleMessageId, scrollToMessage]);

  // Scroll to bottom whenever user change conversationId
  useEffect(() => {
    scrollToBottom();
  }, [conversationId, scrollToBottom]);

  return (
    <ScrollArea
      type="auto"
      bg="#efeae2"
      px="xs"
      flex="1"
      onScrollPositionChange={throttledSetScrollPosition}
      onTopReached={onTopReached}
      onBottomReached={onBottomReached}
      viewportRef={viewport}
    >
      {children}
    </ScrollArea>
  );
});

InfiniteScroll.displayName = "InfiniteScroll";
