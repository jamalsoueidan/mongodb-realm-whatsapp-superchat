import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Flex,
  Group,
  Loader,
  LoadingOverlay,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconArrowRight, IconEye } from "@tabler/icons-react";
import { Route, Router, useLocation, useParams, useRoute } from "wouter";
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

  return (
    <Router base={`/conversation/${params?.conversationId}/flows`}>
      <CustomModal
        opened={isMatch}
        onClose={() => setLocation(`/conversation/${params?.conversationId}`)}
        back={params && params["*"] ? "/" : undefined}
      >
        <LoadingOverlay
          visible={!data}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <Route path="/:flowId/preview">
          <Preview />
        </Route>
        <Route path="/:flowId/send">
          <Send conversation={conversation} />
        </Route>
        <Route path="/">
          <Stack>
            {data
              ?.filter((f) => f.status !== "DEPRECATED")
              .map((flow) => (
                <Flow flow={flow} key={flow.id} />
              ))}
          </Stack>
        </Route>
      </CustomModal>
    </Router>
  );
};

function Flow({ flow }: { flow: Flow }) {
  const [, setLocation] = useLocation();

  return (
    <Card
      withBorder
      onClick={() => setLocation(`/${flow.id}/send`)}
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
              setLocation(`/${flow.id}/preview`);
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

function Preview() {
  const { flowId } = useParams<{ flowId: string }>();
  const { data, loading } = useUserFunction<GetFlow>("func-flow-get", {
    business_phone_number_id: "364826260050460",
    flow_id: flowId,
  });

  if (loading) {
    return <Loader size="xl" />;
  }

  return <iframe src={data?.preview.preview_url} width="100%" height="900" />;
}

function Send({
  conversation,
}: {
  conversation: Conversation & Realm.Object<Conversation>;
}) {
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
      flow_cta: "[ Start testing your Flow ]",
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
}

export const flowExample = {
  metadata: {
    //id: data?.id,
    //name: data?.name,
    //status: data?.status,
  },
  messaging_product: "whatsapp",
  //to: conversation.customer_phone_number,
  recipient_type: "individual",
  type: "interactive",
  interactive: {
    type: "flow",
    header: {
      type: "text",
      //text: values.header,
    },
    body: {
      //text: values.body,
    },
    footer: {
      //text: values.footer,
    },
    action: {
      name: "flow",
      parameters: {
        flow_message_version: "3",
        flow_token: "unused",
        //flow_id: data?.id,
        //mode: data?.status.toLocaleLowerCase(),
        //flow_cta: values.flow_cta,
        flow_action: "navigate",
        flow_action_payload: {
          screen: "INITIAL",
        },
      },
    },
  },
};
