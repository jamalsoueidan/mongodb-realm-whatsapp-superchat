import { Loader } from "@mantine/core";
import { useParams } from "wouter";
import { useUserFunction } from "../../../../../hooks/useUserFunction";
import { GetFlow } from "./FlowItem";

export const FlowPreview = () => {
  const { flowId } = useParams<{ flowId: string }>();
  const { data, loading } = useUserFunction<GetFlow>("func-flow-get", {
    business_phone_number_id: "364826260050460",
    flow_id: flowId,
  });

  if (loading) {
    return <Loader size="xl" />;
  }

  return <iframe src={data?.preview.preview_url} width="100%" height="900" />;
};
