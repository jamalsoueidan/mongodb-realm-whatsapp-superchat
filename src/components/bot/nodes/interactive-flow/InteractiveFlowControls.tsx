import { Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { NodeProps, useReactFlow } from "@xyflow/react";
import { InteractiveFlowNode } from "./InteractiveFlowNode";

export function InteractiveFlowControls(props: NodeProps<InteractiveFlowNode>) {
  const { updateNodeData } = useReactFlow();

  const form = useForm({
    initialValues: props.data,
    onValuesChange: (values) => {
      updateNodeData(props.id, values);
    },
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
    </Stack>
  );
}
