import { Card, Flex } from "@mantine/core";
import Realm from "realm";
import { useMessageInfo } from "../../../hooks/useMessageInfo";
import { Message } from "../../../models/data";

export type MessageWrapperProps = {
  msg: Message & Realm.Object<Message>;
};

export const MessageWrapper = ({
  msg,
  children,
}: MessageWrapperProps & { children: React.ReactNode }) => {
  const { isRecipientDifferent } = useMessageInfo(msg);
  const bg = isRecipientDifferent ? "#d9fdd3" : "white";
  const justify = isRecipientDifferent ? "flex-end" : undefined;

  return (
    <Flex justify={justify} my="xs">
      <Card
        bg={bg}
        py="4px"
        px="6px"
        shadow="xs"
        radius="md"
        maw={{ base: "80%", md: "40%" }}
      >
        {children}
      </Card>
    </Flex>
  );
};
