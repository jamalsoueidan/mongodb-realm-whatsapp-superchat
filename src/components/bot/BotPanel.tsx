import { Button, Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDisc } from "@tabler/icons-react";
import { useReactFlow } from "@xyflow/react";
import Realm from "realm";
import { useParams } from "wouter";
import { useBot } from "../../hooks/useBot";

export function BotPanel() {
  const params = useParams<{ flowId: string }>();
  const { getNodes, getEdges } = useReactFlow();
  const { update } = useBot();
  const [loading, { close: finish, open: start }] = useDisclosure(false);

  const save = () => {
    start();
    update({
      _id: new Realm.BSON.ObjectId(params.flowId),
      nodes: getNodes(),
      edges: getEdges(),
      status: "draft",
    }).then(() => {
      finish();
    });
  };

  return (
    <Flex gap="xs">
      <Button onClick={save} rightSection={<IconDisc />} loading={loading}>
        Save
      </Button>
    </Flex>
  );
}
