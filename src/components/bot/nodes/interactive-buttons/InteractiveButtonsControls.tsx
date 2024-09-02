import { ActionIcon, Button, Group, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import { NodeProps, useReactFlow } from "@xyflow/react";
import React from "react";
import { InteractiveButtonsNode } from "./InteractiveButtonsNode";

export function InteractiveButtonsControls(
  props: NodeProps<InteractiveButtonsNode>
) {
  const { updateNodeData } = useReactFlow();

  const form = useForm({
    initialValues: props.data.interactive,
  });

  const buttons = form
    .getValues()
    .action.buttons.map((button, sectionIndex) => {
      return (
        <React.Fragment key={button.reply.id}>
          <Group gap="xs">
            <TextInput
              withAsterisk
              label="Button"
              flex="1"
              {...form.getInputProps(
                `action.buttons.${sectionIndex}.reply.title`
              )}
            />

            <ActionIcon
              color="red"
              mt="lg"
              onClick={() =>
                form.removeListItem("action.buttons", sectionIndex)
              }
            >
              <IconTrash size="1rem" />
            </ActionIcon>
          </Group>
        </React.Fragment>
      );
    });

  return (
    <Stack>
      <TextInput {...form.getInputProps("header.text")} label="Header" />
      <TextInput {...form.getInputProps("body.text")} label="Body" />
      <TextInput {...form.getInputProps("footer.text")} label="Footer" />

      {buttons}

      {form.getValues().action.buttons.length < 3 ? (
        <Group justify="center">
          <Button
            onClick={() =>
              form.insertListItem(`action.buttons`, {
                type: "",
                reply: {
                  id: new Realm.BSON.ObjectId().toString(),
                  title: "",
                },
              })
            }
          >
            Add button
          </Button>
        </Group>
      ) : null}
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
