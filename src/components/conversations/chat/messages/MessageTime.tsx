import { Box, em, Group, rem, Text } from "@mantine/core";
import { IconCheck, IconChecks } from "@tabler/icons-react";
import dayjs from "dayjs";

import { useMessageInfo } from "../../../../hooks/useMessageInfo";
import { MessageWrapperProps } from "./MessageWrapper";

export function MessageTime({
  msg,
  withChecks = true,
}: MessageWrapperProps & { withChecks?: boolean }) {
  const { isRecipientDifferent } = useMessageInfo(msg);

  if (isRecipientDifferent) {
    return null;
  }
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
    <Box pos="absolute" right="2px" bottom="0">
      <Group gap="4px">
        <Text size={rem(11)} c="gray.6" lh="0">
          {messageDate.format("HH:mm")}
        </Text>
        {withChecks ? checks : null}
      </Group>
    </Box>
  );
}
