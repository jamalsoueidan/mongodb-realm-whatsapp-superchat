import { ActionIcon, Badge, Button, Divider, Flex, Title } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { ReactFlowProvider } from "@xyflow/react";
import { Link, useLocation, useParams, useSearch } from "wouter";
import { useMobile } from "../../hooks/useMobile";

import { useEffect, useState } from "react";
import { BSON } from "realm";
import { Bot, useBot } from "../../hooks/useBot";
import { Flow } from "./Flow";
import { Live } from "./Live";
import { LogDrawer } from "./LogDrawer";
import { BotEdit } from "./nodes/BotEdit";

export const BotView = () => {
  const [, setLocation] = useLocation();
  const isMobile = useMobile();
  const params = useParams<{
    flowId: string;
    id: string;
    section: "replace" | "logs" | "controls";
  }>();

  const [data, setData] = useState<Bot>();
  const search = useSearch();
  const { load } = useBot();
  const live = params?.section === "logs" && params?.id;

  useEffect(() => {
    if (params?.flowId) {
      load({ _id: new BSON.ObjectId(params?.flowId) }).then(setData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex
      direction="column"
      w={
        !isMobile &&
        (params.section === "controls" || search.includes("toggle=logs"))
          ? "calc(70% - 70px)" //70px is for the left navigtation
          : "100%"
      }
      h="100%"
    >
      <Flex p="md" h="60px" justify="space-between" align="center" gap="xs">
        <Flex align="center">
          <ActionIcon
            variant="transparent"
            onClick={() => setLocation("/")}
            color="black"
          >
            <IconArrowLeft />
          </ActionIcon>
          <Title order={3} mr="xs">
            {data?.title} bot{" "}
          </Title>
          <Badge color={data?.status === "published" ? "green" : "yellow"}>
            {data?.status}
          </Badge>
        </Flex>
        <Button component={Link} to={`/${params?.flowId}/edit`}>
          Edit
        </Button>
      </Flex>
      <Divider />
      <ReactFlowProvider>{live ? <Live /> : <Flow />}</ReactFlowProvider>
      <LogDrawer />
      {data ? <BotEdit data={data} setData={setData} /> : null}
    </Flex>
  );
};
