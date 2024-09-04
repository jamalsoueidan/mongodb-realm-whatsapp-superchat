import { Stack, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { ControlWrapperComponent } from "../../ControlWrapperType";
import { MessageNode } from "./MessageNode";

export function MessageControls({
  onValuesChange,
  node,
}: ControlWrapperComponent<MessageNode>) {
  const form = useForm({
    initialValues: node.data,
    onValuesChange,
  });

  return (
    <Stack>
      <Textarea {...form.getInputProps("whatsapp.text.body")} label="Header" />
    </Stack>
  );
}
