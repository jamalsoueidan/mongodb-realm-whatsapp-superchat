import { Card, Flex, Text } from "@mantine/core";
import { MessageTime } from "./MessageTime";
import { MessageWrapperProps } from "./MessageWrapper";

export const MessageSystem = ({ msg }: MessageWrapperProps) => {
  return (
    <Flex justify="center">
      <Card
        bg="yellow.1"
        py="2px"
        px="6px"
        shadow="xs"
        maw={{ base: "80%", md: "40%" }}
      >
        <Text
          size="sm"
          c="gray.9"
          dangerouslySetInnerHTML={{ __html: msg.text?.body || "" }}
        />
        <MessageTime msg={msg} />
      </Card>
    </Flex>
  );
};
