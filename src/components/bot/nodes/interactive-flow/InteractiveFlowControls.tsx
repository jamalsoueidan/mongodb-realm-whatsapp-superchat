import { Button, Group, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { NodeProps, useReactFlow } from "@xyflow/react";
import { InteractiveFlowNode } from "./InteractiveFlowNode";

export function InteractiveFlowControls(props: NodeProps<InteractiveFlowNode>) {
  const { updateNodeData } = useReactFlow();

  const form = useForm({
    initialValues: props.data.interactive,
  });

  return (
    <Stack>
      <TextInput {...form.getInputProps("header.text")} label="Header" />
      <TextInput {...form.getInputProps("body.text")} label="Body" />
      <TextInput {...form.getInputProps("footer.text")} label="Footer" />

      <Group justify="center">
        <Button
          onClick={() =>
            form.insertListItem("action.sections", {
              title: "",
              rows: [],
            })
          }
        >
          Add section
        </Button>
      </Group>

      <Group justify="center">
        <Button variant="subtle" onClick={() => form.reset()}>
          Reset
        </Button>
        <Button
          type="submit"
          color="green"
          onClick={() =>
            updateNodeData(props.id, {
              interactive: form.values,
              type: props.data.type,
            })
          }
        >
          Save
        </Button>
      </Group>
    </Stack>
  );
}
