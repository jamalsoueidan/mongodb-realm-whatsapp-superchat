import { Text } from "@mantine/core";
import { MessageTime } from "./MessageTime";
import { MessageWrapper, MessageWrapperProps } from "./MessageWrapper";

export const MessageText = ({ msg }: MessageWrapperProps) => {
  return (
    <MessageWrapper msg={msg}>
      <Text size="sm" c="gray.9">
        {msg.text?.body}
      </Text>
      <MessageTime msg={msg} />
    </MessageWrapper>
  );
};
