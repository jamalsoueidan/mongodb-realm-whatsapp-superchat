import { Button, Group, Stack, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { NodeProps, useReactFlow } from "@xyflow/react";
import { MessageNode } from "./MessageNode";

export function MessageControls(props: NodeProps<MessageNode>) {
  const { updateNodeData } = useReactFlow();

  const form = useForm({
    initialValues: props.data,
  });

  return (
    <Stack>
      <Textarea {...form.getInputProps("text.body")} label="Header" />

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
