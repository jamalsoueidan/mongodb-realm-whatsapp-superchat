import { ActionIcon, Divider, Flex, Title } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { ReactFlowProvider } from "@xyflow/react";
import { useLocation, useParams, useSearch } from "wouter";
import { useMobile } from "../../hooks/useMobile";

import { ControlDrawer } from "./ControlDrawer";
import { Flow } from "./Flow";
import { Live } from "./Live";
import { LogDrawer } from "./LogDrawer";
import { ModalNodePicker } from "./ModalNodePicker";

export const BotView = () => {
  const [, setLocation] = useLocation();
  const isMobile = useMobile();
  const params = useParams<{
    flowId: string;
    id: string;
    section: "replace" | "logs" | "controls";
  }>();
  const search = useSearch();

  const live = params?.section === "logs" && params?.id;

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
        <Flex>
          <ActionIcon
            variant="transparent"
            onClick={() => setLocation("/")}
            color="black"
          >
            <IconArrowLeft />
          </ActionIcon>
          <Title order={3}>Bot</Title>
        </Flex>
      </Flex>
      <Divider />
      <ReactFlowProvider>
        {live ? (
          <Live />
        ) : (
          <>
            <Flow />
            <ControlDrawer />
            <ModalNodePicker />
          </>
        )}
      </ReactFlowProvider>
      <LogDrawer />
    </Flex>
  );
};
