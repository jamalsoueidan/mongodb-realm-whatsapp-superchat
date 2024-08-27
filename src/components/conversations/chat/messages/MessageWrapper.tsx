import { Avatar, Card, Flex, rem } from "@mantine/core";
import Realm from "realm";
import { useMessageInfo } from "../../../../hooks/useMessageInfo";
import { getInitials } from "../../../../lib/getInitials";
import { Message } from "../../../../models/data";

export type MessageWrapperProps = {
  msg: Message & Realm.Object<Message>;
  bg?: string;
};

export const MessageWrapper = ({
  msg,
  children,
  bg,
}: MessageWrapperProps & { children: React.ReactNode }) => {
  const { isRecipientDifferent } = useMessageInfo(msg);
  const backgroundColor = isRecipientDifferent ? "white" : "#d9fdd3";
  const justify = isRecipientDifferent ? "flex-start" : "flex-end";

  return (
    <Flex justify={justify} align="start" mr="xs" my={rem(8)} gap="6px">
      <Card
        bg={bg || backgroundColor}
        py="4px"
        pl="6px"
        pr={isRecipientDifferent ? "6px" : rem(54)}
        shadow="xs"
        radius="md"
        maw={{ base: "80%", md: "40%" }}
      >
        {children}
      </Card>
      {msg.user ? (
        <Avatar color="cyan" radius="xl" size={rem(30)}>
          {getInitials(msg.user.name)}
        </Avatar>
      ) : null}
    </Flex>
  );
};
