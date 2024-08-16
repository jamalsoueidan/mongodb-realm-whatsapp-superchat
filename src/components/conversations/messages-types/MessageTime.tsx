import { em, Flex, Group, Text } from "@mantine/core";
import { IconChecks } from "@tabler/icons-react";
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
        <IconChecks
          size={em(16)}
          style={{ color: isRead ? "#53bdeb" : "gray" }}
        />
      </Group>
    </Flex>
  );
}
