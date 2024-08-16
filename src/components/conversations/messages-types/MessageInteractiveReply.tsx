import { Card, Notification, Rating, Stack, Text } from "@mantine/core";
import { useMemo } from "react";
import {
  Message_interactive_reply_bookatable,
  Message_interactive_reply_feedback,
} from "../../../models/data";
import { MessageTime } from "./MessageTime";
import { MessageWrapper, MessageWrapperProps } from "./MessageWrapper";

export const MessageInteractiveReply = ({ msg }: MessageWrapperProps) => {
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
  }, [flowName]);

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
      {component}
      <MessageTime msg={msg} />
    </MessageWrapper>
  );
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
          {date.toLocaleString().substring(0, 10)}
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
