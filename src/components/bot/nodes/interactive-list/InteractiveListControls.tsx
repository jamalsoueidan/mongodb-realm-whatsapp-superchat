import { ActionIcon, Button, Group, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import React from "react";
import Realm from "realm";
import { ControlWrapperComponent } from "../../ControlWrapperType";
import { InteractiveListNode } from "./InteractiveListNode";

export function InteractiveListControls({
  onValuesChange,
  node,
}: ControlWrapperComponent<InteractiveListNode>) {
  const form = useForm({
    initialValues: node.data,
    onValuesChange,
  });

  const sections = form
    .getValues()
    .whatsapp.interactive.action.sections.map((section, sectionIndex) => {
      const rows = section.rows.map((row, rowIndex) => (
        <Group key={row.id} gap="xs">
          <TextInput
            withAsterisk
            label="Row title"
            flex="1"
            {...form.getInputProps(
              `whatsapp.interactive.action.sections.${sectionIndex}.rows.${rowIndex}.title`
            )}
          />

          <ActionIcon
            color="red"
            mt="lg"
            onClick={() =>
              form.removeListItem(
                `whatsapp.interactive.action.sections.${sectionIndex}.rows`,
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
              {...form.getInputProps(
                `whatsapp.interactive.action.sections.${sectionIndex}.title`
              )}
            />

            <ActionIcon
              color="red"
              mt="lg"
              onClick={() =>
                form.removeListItem(
                  "whatsapp.interactive.action.sections",
                  sectionIndex
                )
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
                form.insertListItem(
                  `whatsapp.interactive.action.sections.${sectionIndex}.rows`,
                  {
                    id: new Realm.BSON.ObjectId().toString(),
                    title: "",
                  }
                )
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

      {sections}
      <Group justify="center">
        <Button
          onClick={() =>
            form.insertListItem("whatsapp.interactive.action.sections", {
              title: "",
              rows: [],
            })
          }
        >
          Add section
        </Button>
      </Group>
    </Stack>
  );
}
