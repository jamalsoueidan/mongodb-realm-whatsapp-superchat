import { SegmentedControl, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useCallback } from "react";
import { useLocation, useRoute } from "wouter";
import { Bot, useBot } from "../../../hooks/useBot";
import { CustomModal } from "../../CustomModal";

export function BotEdit({
  data,
  setData,
}: {
  data: Bot;
  setData: React.Dispatch<React.SetStateAction<Bot | undefined>>;
}) {
  const [, setLocation] = useLocation();

  const [isMatch] = useRoute("/:flowId/edit");
  const { update } = useBot();

  const onValuesChange = useCallback(
    (values: Bot) => {
      update({
        _id: values._id,
        title: values.title,
      });
      setData((prev) => ({ ...prev, ...values }));
    },
    [setData, update]
  );

  const form = useForm({
    initialValues: data,
    onValuesChange,
  });

  return (
    <CustomModal
      opened={isMatch}
      onClose={() => setLocation(`/${data?._id.toString()}`)}
      title={`Edit ${data.title} bot`}
    >
      <Stack>
        <TextInput {...form.getInputProps("title")} label="Title" />
        <SegmentedControl
          {...form.getInputProps("status")}
          data={[
            { label: "Draft", value: "draft" },
            { label: "Published", value: "published" },
          ]}
        />
      </Stack>
    </CustomModal>
  );
}
