import { Button, Group, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { NodeProps, useReactFlow } from "@xyflow/react";
import { InteractiveFlowNode } from "./InteractiveFlowNode";

export function InteractiveFlowControls(props: NodeProps<InteractiveFlowNode>) {
  const { updateNodeData } = useReactFlow();

  const form = useForm({
    initialValues: props.data,
  });

  return (
    <Stack>
      <TextInput
        {...form.getInputProps("whatsapp.interactive.header.text")}
        label="Header"
      />
      <TextInput
        {...form.getInputProps("whatsapp.interactive.body.text")}
        label="Body"
      />
      <TextInput
        {...form.getInputProps("whatsapp.interactive.footer.text")}
        label="Footer"
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
