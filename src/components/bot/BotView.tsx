import { LoadingOverlay } from "@mantine/core";
import { ReactFlowProvider } from "@xyflow/react";
import { useParams } from "wouter";
import { Bot } from "../../hooks/useBot";
import { useUserFunction } from "../../hooks/useUserFunction";
import { DrawerNodeControl } from "./DrawerNodeControl";
import { Flow } from "./Flow";
import { ModalNodePicker } from "./ModalNodePicker";

export const BotView = () => {
  const params = useParams<{ flowId: string }>();
  const { data, loading } = useUserFunction<Bot>("func-bot-get", {
    _id: params.flowId,
  });

  return (
    <ReactFlowProvider>
      {loading ? <LoadingOverlay visible /> : null}
      {data ? (
        <Flow initialEdges={data.edges} initialNodes={data.nodes} />
      ) : null}
      <DrawerNodeControl />
      <ModalNodePicker />
    </ReactFlowProvider>
  );
};
