import { em, Flex, Group, Text } from "@mantine/core";
import { IconCheck, IconChecks } from "@tabler/icons-react";
import dayjs from "dayjs";
import { MessageWrapperProps } from "./MessageWrapper";

export function MessageTime({
  msg,
  withChecks = true,
}: MessageWrapperProps & { withChecks?: boolean }) {
  const messageDate = dayjs(msg.timestamp * 1000);
  const isRead = !!msg.statuses?.find((r) => r.status === "read");

  const checks =
    msg.message_id === "not_send_yet" ? (
      <IconCheck size={em(16)} style={{ color: isRead ? "#53bdeb" : "gray" }} />
    ) : (
      <IconChecks
        size={em(16)}
        style={{ color: isRead ? "#53bdeb" : "gray" }}
      />
    );
  return (
    <Flex justify="flex-end">
      <Group gap="4px">
        <Text size="xs" c="gray.6">
          {messageDate.format("HH:mm")}
        </Text>
        {withChecks ? checks : null}
      </Group>
    </Flex>
  );
}
