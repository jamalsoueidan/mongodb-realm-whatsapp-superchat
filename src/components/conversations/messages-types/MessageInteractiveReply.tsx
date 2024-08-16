import { Card, Notification, Text } from "@mantine/core";
import { MessageTime } from "./MessageTime";
import { MessageWrapper, MessageWrapperProps } from "./MessageWrapper";

export const MessageInteractiveReply = ({ msg }: MessageWrapperProps) => {
  const date = new Date(msg.interactive_reply?.response_json?.date || "");

  return (
    <MessageWrapper msg={msg}>
      <Card.Section>
        <Notification
          color="green"
          bg="green.2"
          px="md"
          py="4px"
          mt="md"
          mx="md"
          mb="4px"
          withCloseButton={false}
        >
          <Text size="xs" c="dimmed">
            {msg.reply?.interactive?.header?.text}
          </Text>
          <Text size="xs" c="dimmed">
            {msg.reply?.interactive?.body?.text}
          </Text>
          <Text size="xs" c="dimmed">
            {msg.reply?.interactive?.footer?.text}
          </Text>
        </Notification>
      </Card.Section>
      <Text size="sm" c="gray.9" mt="4px">
        Date: {date.toLocaleString().substring(0, 10)}
      </Text>
      <Text size="sm" c="gray.9">
        Time: {msg.interactive_reply?.response_json?.time}
      </Text>
      <Text size="sm" c="gray.9">
        Total: {msg.interactive_reply?.response_json?.total}
      </Text>
      <Text size="sm" c="gray.9">
        Comment: {msg.interactive_reply?.response_json?.comment}
      </Text>
      <MessageTime msg={msg} />
    </MessageWrapper>
  );
};
