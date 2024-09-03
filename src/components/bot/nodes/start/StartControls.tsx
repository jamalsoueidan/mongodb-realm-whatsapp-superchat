import { Button, Group, SegmentedControl, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { NodeProps, useReactFlow } from "@xyflow/react";
import { StartNode } from "./StartNode";

export function StartControls(props: NodeProps<StartNode>) {
  const { updateNodeData } = useReactFlow();

  const form = useForm({
    initialValues: props.data,
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

      <Group justify="center">
        <Button variant="subtle" onClick={() => form.reset()}>
          Reset
        </Button>
        <Button
          type="submit"
          color="green"
          onClick={() => updateNodeData(props.id, form.values)}
        >
          Save
        </Button>
      </Group>
    </Stack>
  );
}
