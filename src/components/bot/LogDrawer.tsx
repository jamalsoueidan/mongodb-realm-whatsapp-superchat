/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Divider,
  Drawer,
  Flex,
  ScrollArea,
  Text,
  Title,
} from "@mantine/core";
import { Link, useRoute, useSearch } from "wouter";
import { useMobile } from "../../hooks/useMobile";

import { IconX } from "@tabler/icons-react";
import dayjs from "dayjs";
import React from "react";
import { BotLog } from "../../hooks/useBotLog";
import { useUserFunction } from "../../hooks/useUserFunction";

export const LogDrawer = () => {
  const isMobile = useMobile();
  const [isMatch, params] = useRoute<{
    flowId: string;
    id: string;
  }>(":flowId/logs/:id?");
  const search = useSearch();

  const { data } = useUserFunction<Array<BotLog>>(
    "func-bot-log-list",
    {
      bot: params?.flowId,
    },
    isMatch
  );

  if (!params) {
    return null;
  }

  return (
    <Drawer.Root
      position="right"
      size={isMobile ? "100%" : "30%"}
      opened={search.includes("toggle=logs")}
      onClose={() => {}}
      scrollAreaComponent={ScrollArea.Autosize}
    >
      <Drawer.Content>
        <Drawer.Body p="0">
          <Flex
            h="60px"
            w="100%"
            align="center"
            justify="space-between"
            px="sm"
          >
            <Title order={3}>Logs</Title>
            <ActionIcon
              component={Link}
              to={
                params.id
                  ? `/${params.flowId}/logs/${params.id}`
                  : `/${params.flowId}`
              }
              variant="transparent"
              color="black"
            >
              <IconX />
            </ActionIcon>
          </Flex>
          <Divider />
          {data?.length === 0 ? <Box p="xs">Nothing here yet</Box> : null}
          {data?.map((log) => (
            <React.Fragment key={log._id.toString()}>
              <Card>
                <Flex direction="row" justify="space-between" align="center">
                  <Box>
                    <Text>{log.conversation.name}</Text>
                    <Text fz="xs">
                      updated {dayjs(log.updated_at * 1000).fromNow()}
                    </Text>
                    <Text size="xs">{log.nodes.length} steps</Text>
                  </Box>
                  <Button
                    component={Link}
                    to={`/${params.flowId}/logs/${log._id}?${search}`}
                  >
                    View live
                  </Button>
                </Flex>
              </Card>
              <Divider />
            </React.Fragment>
          ))}
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
};
