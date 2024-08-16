import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Flex,
  Group,
  LoadingOverlay,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconArrowRight, IconEye } from "@tabler/icons-react";
import { Route, useLocation, useParams, useRoute } from "wouter";
import { useGetConversation } from "../../hooks/useGetConversation";
import { useSendMessage } from "../../hooks/useSendMessage";
import { useUserFunction } from "../../hooks/useUserFunction";
import { Conversation } from "../../models/data";
import { CustomModal } from "../CustomModal";

type Flow = {
  id: string;
  name: string;
  status: "DEPRECATED" | "PUBLISHED" | "DRAFT";
  categories: string[];
  validation_errors: string[];
};

type GetFlow = {
  preview: {
    preview_url: string;
    expires_at: string;
  };
} & Flow;

export const ChatFlows = () => {
  const [, setLocation] = useLocation();
  const [isMatch, params] = useRoute("/conversation/:conversationId/flows/*?");
  const { conversationId } = useParams<{ conversationId: string }>();
  const conversation = useGetConversation(conversationId);
  const { data, error } = useUserFunction<Array<Flow>>("func-flow-list", {
    business_phone_number_id: "364826260050460",
  });

  if (error) return <p>Error: {error.message}</p>;

  console.log(params);
  return (
    <CustomModal
      opened={isMatch}
      onClose={() => setLocation(`/conversation/${params?.conversationId}`)}
      back={
        params && params["*"]
          ? () => {
              setLocation(`/conversation/${params?.conversationId}/flows`);
            }
          : undefined
      }
    >
      <LoadingOverlay
        visible={!data}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      <Route path="/conversation/:conversationId/flows/:flowId/preview">
        <Preview conversation={conversation} />
      </Route>
      <Route path="/conversation/:conversationId/flows/:flowId/send">
        <Send conversation={conversation} />
      </Route>
      <Route path="/conversation/:conversationId/flows">
        <Stack>
          {data
            ?.filter((f) => f.status !== "DEPRECATED")
            .map((flow) => (
              <Flow flow={flow} key={flow.id} />
            ))}
        </Stack>
      </Route>
    </CustomModal>
  );
};

function Flow({ flow }: { flow: Flow }) {
  const [, setLocation] = useLocation();

  return (
    <Card
      withBorder
      onClick={() => setLocation(`flows/${flow.id}/send`)}
      style={{ cursor: "pointer" }}
    >
      <Group justify="space-between">
        <Flex direction="column">
          <Text>{flow.name.substring(0, 25)}</Text>
          <Badge color={flow.status === "DRAFT" ? "yellow" : "green"}>
            {flow.status}
          </Badge>
        </Flex>
        <Flex gap="xs">
          <ActionIcon
            onClick={(e) => {
              e.stopPropagation();
              setLocation(`flows/${flow.id}/preview`);
            }}
            variant="transparent"
            color="black"
          >
            <IconEye />
          </ActionIcon>
          <ActionIcon variant="transparent" color="black">
            <IconArrowRight />
          </ActionIcon>
        </Flex>
      </Group>
    </Card>
  );
}

function Preview({
  conversation,
}: {
  conversation: Conversation & Realm.Object<Conversation>;
}) {
  const { flowId } = useParams<{ flowId: string }>();
  const { data } = useUserFunction<GetFlow>("func-flow-get", {
    business_phone_number_id: "364826260050460",
    flow_id: flowId,
  });

  return <iframe src={data?.preview.preview_url} width="100%" height="900" />;
}

function Send({
  conversation,
}: {
  conversation: Conversation & Realm.Object<Conversation>;
}) {
  const { flowId } = useParams<{ flowId: string }>();
  const { data } = useUserFunction<GetFlow>("func-flow-get", {
    business_phone_number_id: "364826260050460",
    flow_id: flowId,
  });

  const { send, count } = useSendMessage();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      header: "Table Booking",
      body: "Hi! Thanks for choosing to book a table with us. Please select the date, time, and number of people so we can assist you with the reservation.",
      footer: "By Zigzag",
      flow_cta: "[ Start testing your Flow ]",
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) =>
        send({
          messaging_product: "whatsapp",
          to: conversation.customer_phone_number,
          recipient_type: "individual",
          type: "interactive",
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
        })
      )}
    >
      <Stack>
        <TextInput label="Header" {...form.getInputProps("header")} />
        <Textarea label="Body" {...form.getInputProps("body")} />
        <TextInput label="Footer" {...form.getInputProps("footer")} />
        <TextInput label="Button" {...form.getInputProps("flow_cta")} />
        <Button loading={count > 0} type="submit">
          Send
        </Button>
      </Stack>
    </form>
  );
}
