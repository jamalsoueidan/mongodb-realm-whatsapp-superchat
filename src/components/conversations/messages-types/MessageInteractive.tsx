import { Box, Card, Divider, Text } from "@mantine/core";
import { MessageTime } from "./MessageTime";
import { MessageWrapper, MessageWrapperProps } from "./MessageWrapper";

export const MessageInteractive = ({ msg }: MessageWrapperProps) => {
  const isReplied = !!msg.statuses.find((r) => r.status === "replied");

  return (
    <MessageWrapper msg={msg}>
      <Text size="sm" c="gray.9" fw="bold">
        {msg.interactive?.header?.text}
      </Text>
      <Text size="sm" c="gray.9">
        {msg.interactive?.body?.text}
      </Text>
      <Text size="sm" c="dimmed">
        {msg.interactive?.footer?.text}
      </Text>
      <MessageTime msg={msg} />
      <Card.Section>
        <Divider />
      </Card.Section>
      <Box p="4px">
        <Text
          size="xs"
          c={isReplied ? "dimmed" : "green"}
          fw="bold"
          ta="center"
        >
          {msg.interactive?.action?.parameters?.flow_cta}
        </Text>
      </Box>
    </MessageWrapper>
  );
};
