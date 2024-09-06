import { SegmentedControl, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { ControlWrapperComponent } from "../../ControlWrapperType";
import { StartNode } from "./StartNode";

export function StartControls({
  onValuesChange,
  node,
}: ControlWrapperComponent<StartNode>) {
  const form = useForm({
    initialValues: node.data,
    onValuesChange,
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