import { ActionIcon, Button, Group, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import React from "react";
import { NodeProps } from "reactflow";
import { InteractiveList } from "./InteractiveListType";
import { useInteractiveList } from "./useInteractiveList";

export function InteractiveListControls(props: NodeProps<InteractiveList>) {
  const { update } = useInteractiveList(props.id);

  const form = useForm({
    initialValues: props.data.interactive,
  });

  const sections = form
    .getValues()
    .action.sections.map((section, sectionIndex) => {
      const rows = section.rows.map((row, rowIndex) => (
        <Group key={row.id} gap="xs">
          <TextInput
            withAsterisk
            label="Row title"
            flex="1"
            {...form.getInputProps(
              `action.sections.${sectionIndex}.rows.${rowIndex}.title`
            )}
          />

          <ActionIcon
            color="red"
            mt="lg"
            onClick={() =>
              form.removeListItem(
                `action.sections.${sectionIndex}.rows`,
                rowIndex
              )
            }
          >
            <IconTrash size="1rem" />
          </ActionIcon>
        </Group>
      ));

      return (
        <React.Fragment key={sectionIndex}>
          <Group gap="xs">
            <TextInput
              withAsterisk
              label="Section title"
              flex="1"
              {...form.getInputProps(`action.sections.${sectionIndex}.title`)}
            />

            <ActionIcon
              color="red"
              mt="lg"
              onClick={() =>
                form.removeListItem("action.sections", sectionIndex)
              }
            >
              <IconTrash size="1rem" />
            </ActionIcon>
          </Group>
          <Stack gap="xs" px="md">
            {rows}
          </Stack>
          <Group justify="center">
            <Button
              onClick={() =>
                form.insertListItem(`action.sections.${sectionIndex}.rows`, {
                  id: new Realm.BSON.ObjectId().toString(),
                  title: "",
                })
              }
            >
              Add row
            </Button>
          </Group>
        </React.Fragment>
      );
    });

  return (
    <Stack>
      <TextInput {...form.getInputProps("header.text")} label="Header" />
      <TextInput {...form.getInputProps("body.text")} label="Body" />
      <TextInput {...form.getInputProps("footer.text")} label="Footer" />

      {sections}
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

      <Button
        type="submit"
        mt="md"
        onClick={() =>
          update({ interactive: form.values, type: props.data.type })
        }
      >
        Submit
      </Button>
    </Stack>
  );
}
