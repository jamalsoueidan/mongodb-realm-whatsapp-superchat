import { SegmentedControl, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { NodeProps, useReactFlow } from "@xyflow/react";
import { StartNode } from "./StartNode";

export function StartControls(props: NodeProps<StartNode>) {
  const { updateNodeData } = useReactFlow();

  const form = useForm({
    initialValues: props.data,
    onValuesChange: (values) => {
      updateNodeData(props.id, values);
    },
  });

  return (
    <Stack>
      <SegmentedControl
        {...form.getInputProps("type")}
        data={[
          { label: "On received message", value: "on_received_message" },
          { label: "unknown", value: "unknown" },
        ]}
      />
    </Stack>
  );
}
