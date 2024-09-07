import { ActionIcon, Divider, Flex, Title } from "@mantine/core";
import { useRealm } from "@realm/react";
import {
  Background,
  Controls,
  Panel,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useEffect } from "react";

import { IconX } from "@tabler/icons-react";
import { BSON } from "realm";
import { Link, useParams } from "wouter";
import { useBotLog } from "../../hooks/useBotLog";
import { CustomerBotSchema } from "../../models/data";
import { liveEdgeTypes } from "./CustomEdgeTypes";
import { nodeTypes } from "./Flow";
import { NodeAutoLayout } from "./NodeAutoLayout";

export const Live = () => {
  const params = useParams();
  const realm = useRealm();
  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);
  const { load } = useBotLog();

  const customerBot = realm.objectForPrimaryKey(
    CustomerBotSchema.name,
    new BSON.ObjectId(params?.id)
  );

  console.log(params);
  // Function to reload data
  const reloadBot = useCallback(() => {
    const { id, flowId } = params;
    if (id && flowId) {
      load({
        _id: new BSON.ObjectId(id),
        bot: new BSON.ObjectId(flowId),
      }).then((value) => {
        setNodes(
          value?.nodes
            .filter((node) => node.type !== "plus")
            .map((node) => ({
              ...node,
              selected: false, //remove some unnecessary properties
            })) as never
        );
        setEdges(
          value?.edges.map((edge) => ({
            ...edge,
            animated: false, //remove some unnecessary properties
          })) as never
        );
      });
    }
  }, [load, setNodes, params, setEdges]);

  useEffect(() => {
    if (customerBot) {
      customerBot.addListener(reloadBot);
    }

    return () => {
      if (customerBot) {
        customerBot.removeListener(reloadBot);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex direction="column" w="100%" h="100%">
      <Flex p="sm" align="center" justify="space-between" gap="xs" bg="green.5">
        <Title order={5}>Live</Title>
        <ActionIcon
          variant="transparent"
          color="black"
          component={Link}
          to={`/${params?.flowId}`}
        >
          <IconX />
        </ActionIcon>
      </Flex>
      <Divider />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        elementsSelectable={false}
        nodeTypes={nodeTypes}
        edgeTypes={liveEdgeTypes}
        fitView
      >
        <Panel position="top-right">
          <NodeAutoLayout />
        </Panel>
        <Controls />
        <Background />
      </ReactFlow>
    </Flex>
  );
};
