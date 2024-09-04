import { Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { ControlWrapperComponent } from "../../ControlWrapperType";
import { InteractiveFlowNode } from "./InteractiveFlowNode";

export function InteractiveFlowControls({
  onValuesChange,
  node,
}: ControlWrapperComponent<InteractiveFlowNode>) {
  const form = useForm({
    initialValues: node.data,
    onValuesChange,
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
