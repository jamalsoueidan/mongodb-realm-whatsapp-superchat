import { Stack, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { NodeProps, useReactFlow } from "@xyflow/react";
import { MessageNode } from "./MessageNode";

export function MessageControls(props: NodeProps<MessageNode>) {
  const { updateNodeData } = useReactFlow();

  const form = useForm({
    initialValues: props.data,
    onValuesChange: (values) => {
      updateNodeData(props.id, values);
    },
  });

  return (
    <Stack>
      <Textarea {...form.getInputProps("whatsapp.text.body")} label="Header" />
    </Stack>
  );
}
