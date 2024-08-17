import { em, Flex, Group, Text } from "@mantine/core";
import { IconCheck, IconChecks } from "@tabler/icons-react";
import { useMessageInfo } from "../../../hooks/useMessageInfo";
import { MessageWrapperProps } from "./MessageWrapper";

export function MessageTime({ msg }: MessageWrapperProps) {
  const { receivedDate } = useMessageInfo(msg);
  const isRead = !!msg.statuses?.find((r) => r.status === "read");

  return (
    <Flex justify="flex-end">
      <Group gap="4px">
        <Text size="xs" c="gray.6">
          {receivedDate.toLocaleString()}
        </Text>
        {msg.message_id === "not_send_yet" ? (
          <IconCheck
            size={em(16)}
            style={{ color: isRead ? "#53bdeb" : "gray" }}
          />
        ) : (
          <IconChecks
            size={em(16)}
            style={{ color: isRead ? "#53bdeb" : "gray" }}
          />
        )}
      </Group>
    </Flex>
  );
}
