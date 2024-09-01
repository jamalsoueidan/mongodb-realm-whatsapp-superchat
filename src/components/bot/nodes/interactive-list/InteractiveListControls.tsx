import { Button, Code, Stack, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { NodeProps } from "reactflow";
import { InteractiveList } from "./InteractiveListType";

export function InteractiveListControls(props: NodeProps<InteractiveList>) {
  const form = useForm({
    mode: "controlled",
    initialValues: props.data.interactive,
  });

  const [submittedValues, setSubmittedValues] = useState<
    typeof form.values | null
  >(null);

  return (
    <form onSubmit={form.onSubmit(setSubmittedValues)}>
      <Stack>
        <TextInput {...form.getInputProps("header.text")} label="Header" />
        <TextInput {...form.getInputProps("body.text")} label="Body" />
        <TextInput {...form.getInputProps("footer.text")} label="Footer" />
        <Button type="submit" mt="md">
          Submit
        </Button>
      </Stack>

      <Text mt="md">Form values:</Text>
      <Code block>{JSON.stringify(form.values, null, 2)}</Code>

      <Text mt="md">Submitted values:</Text>
      <Code block>
        {submittedValues ? JSON.stringify(submittedValues, null, 2) : "–"}
      </Code>
    </form>
  );
}
