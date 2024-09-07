import { Select, Stack, Switch, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useUserFunction } from "../../../../hooks/useUserFunction";
import { Flow } from "../../../conversations/chat/attachments/flows/FlowItem";
import { ControlWrapperComponent } from "../../NodeControlWrapperType";
import { InteractiveFlowNode } from "./InteractiveFlowNode";

export function InteractiveFlowControls({
  onValuesChange,
  node,
}: ControlWrapperComponent<InteractiveFlowNode>) {
  const form = useForm({
    initialValues: node.data,
    onValuesChange,
  });

  const { data } = useUserFunction<Array<Flow>>("func-flow-list", {
    business_phone_number_id: "364826260050460",
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
      <TextInput
        {...form.getInputProps(
          "whatsapp.interactive.action.parameters.flow_cta"
        )}
        label="Button"
      />

      <Select
        {...form.getInputProps(
          "whatsapp.interactive.action.parameters.flow_id"
        )}
        data={data?.map((flow) => ({
          value: flow.id,
          label: flow.name,
        }))}
        label="Button"
      />
      <Switch
        label="Require response"
        {...form.getInputProps("config.require_response", { type: "checkbox" })}
      />
    </Stack>
  );
}
