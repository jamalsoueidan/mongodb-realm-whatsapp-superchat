import { ActionIcon, Button, Select, Stack, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconFiles, IconPrinter, IconSend } from "@tabler/icons-react";
import { Panel, useReactFlow } from "@xyflow/react";
import { useCallback, useState } from "react";
import { Link, useParams } from "wouter";
import { useContacts } from "../../hooks/useContacts";
import { CustomModal } from "../CustomModal";
import { NodeAutoLayout } from "./NodeAutoLayout";

export function FlowPanel() {
  const params = useParams<{
    flowId: string;
    id: string;
    section: "replace" | "controls" | "logs";
  }>();
  const { getNodes, getEdges } = useReactFlow();
  const [opened, { close, open }] = useDisclosure(false);

  const [value, setValue] = useState<string | null>("");
  const [searchValue, setSearchValue] = useState("");
  const contacts = useContacts(searchValue);

  const send = useCallback(() => {}, []);

  return (
    <Panel position="top-right">
      <Stack gap="xs">
        <Tooltip label="Logs" position="left">
          <ActionIcon
            size="lg"
            component={Link}
            to={
              params.id && params.section === "logs"
                ? `/${params.flowId}/logs/${params.id}?toggle=logs`
                : `/${params.flowId}/logs?toggle=logs`
            }
          >
            <IconFiles />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Send" position="left">
          <ActionIcon size="lg" onClick={open}>
            <IconSend />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Print" position="left">
          <ActionIcon
            size="lg"
            onClick={() => console.log(getNodes(), getEdges())}
          >
            <IconPrinter />
          </ActionIcon>
        </Tooltip>
        <NodeAutoLayout />
      </Stack>

      <CustomModal opened={opened} onClose={close} title="Send bot">
        <Stack>
          <Select
            label="Contacts"
            placeholder="Pick contact"
            searchable
            searchValue={searchValue}
            value={value}
            onChange={setValue}
            onSearchChange={setSearchValue}
            data={contacts.map((contact) => contact.name || "unknown")}
            maxDropdownHeight={200}
            nothingFoundMessage="Nothing found..."
          />
          <Select
            label="Node"
            placeholder="From which node to start the flow?"
            data={getNodes().map((node) => ({
              value: node.id,
              label: node.type || "unknown",
            }))}
          />
          <div>
            <Button onClick={send} rightSection={<IconSend />}>
              Send
            </Button>
          </div>
        </Stack>
      </CustomModal>
    </Panel>
  );
}
