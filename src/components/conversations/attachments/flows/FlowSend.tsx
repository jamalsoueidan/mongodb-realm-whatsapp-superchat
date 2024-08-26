import {
  Badge,
  Button,
  Flex,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useLocation, useParams } from "wouter";
import { useSendMessage } from "../../../../hooks/useSendMessage";
import { useUserFunction } from "../../../../hooks/useUserFunction";
import { GetFlow } from "./FlowItem";

export const FlowSend = () => {
  const [, setLocation] = useLocation();
  const { flowId } = useParams<{ flowId: string }>();
  const { data } = useUserFunction<GetFlow>("func-flow-get", {
    business_phone_number_id: "364826260050460",
    flow_id: flowId,
  });

  const { sendFlow } = useSendMessage();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      header: "Table Booking",
      body: "Hi! Thanks for choosing to book a table with us. Please select the date, time, and number of people so we can assist you with the reservation.",
      footer: "By Zigzag",
      flow_cta: "Book table",
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        sendFlow({
          interactive: {
            type: "flow",
            header: {
              type: "text",
              text: values.header,
            },
            body: {
              text: values.body,
            },
            footer: {
              text: values.footer,
            },
            action: {
              name: "flow",
              parameters: {
                flow_message_version: "3",
                flow_token: "unused",
                flow_id: data?.id,
                mode: data?.status.toLocaleLowerCase(),
                flow_cta: values.flow_cta,
                flow_action: "navigate",
                flow_action_payload: {
                  screen: "INITIAL",
                },
              },
            },
          },
        });
      })}
    >
      <Stack gap="xs">
        <div>
          <Title order={3}>{data?.name}</Title>
          <Badge color={data?.status === "DRAFT" ? "yellow" : "green"}>
            {data?.status}
          </Badge>
        </div>

        {data?.status !== "PUBLISHED" ? <Text></Text> : null}
        <TextInput
          label="Header"
          {...form.getInputProps("header")}
          disabled={data?.status !== "PUBLISHED"}
        />
        <Textarea
          label="Body"
          {...form.getInputProps("body")}
          disabled={data?.status !== "PUBLISHED"}
        />
        <TextInput
          label="Footer"
          {...form.getInputProps("footer")}
          disabled={data?.status !== "PUBLISHED"}
        />
        <TextInput
          label="Button"
          {...form.getInputProps("flow_cta")}
          disabled={data?.status !== "PUBLISHED"}
        />
        <Flex justify="flex-end" gap="sm">
          <Button
            type="button"
            variant="subtle"
            onClick={() => setLocation(`/`)}
          >
            Back
          </Button>
          <Button type="submit">
            Send {data?.status !== "PUBLISHED" ? "Test" : ""}
          </Button>
        </Flex>
      </Stack>
    </form>
  );
};
