import {
  ActionIcon,
  Button,
  Group,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import React from "react";
import { BSON } from "realm";
import { ControlWrapperComponent } from "../../NodeControlWrapperType";
import { InteractiveButtonsNode } from "./InteractiveButtonsNode";

export function InteractiveButtonsControls({
  onValuesChange,
  node,
}: ControlWrapperComponent<InteractiveButtonsNode>) {
  const form = useForm({
    initialValues: node.data,
    onValuesChange,
  });

  const buttons = form
    .getValues()
    .whatsapp.interactive.action.buttons.map((button, sectionIndex) => {
      return (
        <React.Fragment key={button.reply.id}>
          <Group gap="xs">
            <TextInput
              withAsterisk
              label="Button"
              flex="1"
              {...form.getInputProps(
                `whatsapp.interactive.action.buttons.${sectionIndex}.reply.title`
              )}
            />

            <ActionIcon
              color="red"
              mt="lg"
              onClick={() =>
                form.removeListItem(
                  "whatsapp.interactive.action.buttons",
                  sectionIndex
                )
              }
            >
              <IconTrash size="1rem" />
            </ActionIcon>
          </Group>
        </React.Fragment>
      );
    });

  return (
    <Stack gap="xs">
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

      {buttons}

      {form.getValues().whatsapp.interactive.action.buttons.length < 3 ? (
        <Group justify="center">
          <Button
            onClick={() =>
              form.insertListItem(`whatsapp.interactive.action.buttons`, {
                type: "reply",
                reply: {
                  id: new BSON.ObjectId().toString(),
                  title: "",
                },
              })
            }
          >
            Add button
          </Button>
        </Group>
      ) : (
        <Text fz="xs" color="red">
          Max 3 buttons allowed
        </Text>
      )}
    </Stack>
  );
}
