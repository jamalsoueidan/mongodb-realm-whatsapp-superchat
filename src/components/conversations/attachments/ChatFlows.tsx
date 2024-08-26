import { LoadingOverlay, Stack } from "@mantine/core";
import { Route, Router, useLocation, useRoute } from "wouter";
import { useUserFunction } from "../../../hooks/useUserFunction";
import { CustomModal } from "../../CustomModal";
import { Flow, FlowItem } from "./flows/FlowItem";
import { FlowPreview } from "./flows/FlowPreview";
import { FlowSend } from "./flows/FlowSend";

export const AttachmentFlows = () => {
  const [, setLocation] = useLocation();
  const [isMatch, params] = useRoute("/:conversationId/flows/*?");
  const { data, error } = useUserFunction<Array<Flow>>(
    "func-flow-list",
    {
      business_phone_number_id: "364826260050460",
    },
    isMatch
  );

  if (error) return <p>Error: {error.message}</p>;

  return (
    <Router base={`/${params?.conversationId}/flows`}>
      <CustomModal
        opened={isMatch}
        onClose={() => setLocation(`/${params?.conversationId}`)}
        back={params && params["*"] ? "/" : undefined}
      >
        <LoadingOverlay
          visible={!data}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <Route path="/:flowId/preview">
          <FlowPreview />
        </Route>
        <Route path="/:flowId/send">
          <FlowSend />
        </Route>
        <Route path="/">
          <Stack>
            {data
              ?.filter((f) => f.status !== "DEPRECATED")
              .map((flow) => (
                <FlowItem flow={flow} key={flow.id} />
              ))}
          </Stack>
        </Route>
      </CustomModal>
    </Router>
  );
};
