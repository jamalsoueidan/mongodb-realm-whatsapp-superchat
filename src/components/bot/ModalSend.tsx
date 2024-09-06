import { Button, Select, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSend } from "@tabler/icons-react";
import { useReactFlow } from "@xyflow/react";
import { useCallback, useState } from "react";
import { BSON } from "realm";
import { useParams } from "wouter";
import { useBot } from "../../hooks/useBot";
import { useContacts } from "../../hooks/useContacts";
import { CustomModal } from "../CustomModal";

export function BotPanel() {
  const params = useParams<{
    flowId: string;
    id: string;
    section: "replace" | "controls" | "logs";
  }>();
  const { getNodes, getEdges } = useReactFlow();
  const { update } = useBot();
  const [loading, { close: finish, open: start }] = useDisclosure(false);
  const [opened, { close, open }] = useDisclosure(false);

  const [value, setValue] = useState<string | null>("");
  const [searchValue, setSearchValue] = useState("");
  const contacts = useContacts(searchValue);

  const save = useCallback(() => {
    start();
    update({
      _id: new BSON.ObjectId(params.flowId),
      nodes: getNodes(),
      edges: getEdges(),
      status: "draft",
    }).then(() => {
      finish();
    });
  }, [finish, getEdges, getNodes, params.flowId, start, update]);

  const send = useCallback(() => {}, []);

  return (
    <>
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
            <Button
              onClick={send}
              rightSection={<IconSend />}
              loading={loading}
            >
              Send
            </Button>
          </div>
        </Stack>
      </CustomModal>
    </>
  );
}
