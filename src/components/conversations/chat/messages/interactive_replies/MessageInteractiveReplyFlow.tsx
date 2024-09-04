/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { Rating, Stack, Text } from "@mantine/core";
import { useMemo } from "react";
import {
  Message_interactive_reply_bookatable,
  Message_interactive_reply_feedback,
} from "../../../../../models/data";
import { MessageWrapperProps } from "../MessageWrapper";

export const MessageInteractiveReplyFlow = ({ msg }: MessageWrapperProps) => {
  const interactiveReply = msg.interactive_reply;
  const flowName = msg.interactive_reply?.flow_name;

  const component = useMemo(() => {
    switch (flowName) {
      case "bookatable":
        return <Bookatable data={interactiveReply?.bookatable!} />;
      case "feedback":
        return <Feedback data={interactiveReply?.feedback!} />;
      default:
        return <Text>Unknown flow</Text>;
    }
  }, [flowName, interactiveReply?.bookatable, interactiveReply?.feedback]);

  return component;
};

function Bookatable({ data }: { data: Message_interactive_reply_bookatable }) {
  const date = new Date(data.date?.value || "");

  return (
    <Stack gap="xs">
      <div>
        <Text size="sm" c="gray.9" mt="4px" fw="bold">
          {data.date?.question}
        </Text>
        <Text size="sm" c="gray.9">
          {date.toLocaleDateString()}
        </Text>
      </div>
      <div>
        <Text size="sm" c="gray.9" fw="bold">
          {data.time?.question}
        </Text>
        <Text size="sm" c="gray.9">
          {data.time?.value}
        </Text>
      </div>{" "}
      <div>
        <Text size="sm" c="gray.9" fw="bold">
          {data.total?.question}
        </Text>
        <Text size="sm" c="gray.9">
          {data.total?.value}
        </Text>
      </div>
      <div>
        <Text size="sm" c="gray.9" fw="bold">
          {data.comment?.question}
        </Text>
        <Text size="sm" c="gray.9">
          {data.comment?.value}
        </Text>
      </div>
    </Stack>
  );
}

function Feedback({ data }: { data: Message_interactive_reply_feedback }) {
  return (
    <Stack gap="xs">
      <div>
        <Text size="sm" c="gray.9" fw="bold">
          {data.food?.question}
        </Text>
        <Text size="sm" c="gray.9">
          <Rating defaultValue={data.food?.value} />
        </Text>
      </div>{" "}
      <div>
        <Text size="sm" c="gray.9" fw="bold">
          {data.service?.question}
        </Text>
        <Text size="sm" c="gray.9">
          <Rating defaultValue={data.food?.value} />
        </Text>
      </div>
      <div>
        <Text size="sm" c="gray.9" fw="bold">
          {data.comment?.question}
        </Text>
        <Text size="sm" c="gray.9">
          {data.comment?.value}
        </Text>
      </div>
    </Stack>
  );
}
