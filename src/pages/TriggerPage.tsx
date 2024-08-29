import { useCallback } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Connection,
  Controls,
  Edge,
  MiniMap,
  Node,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "reactflow";

import { ActionIcon, Divider, Flex, Title } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import "reactflow/dist/style.css";
import { Route, Router, useLocation, useRoute } from "wouter";
import { InteractiveButtons } from "../components/triggers/InteractiveButtons";
import { InteractiveFlow } from "../components/triggers/InteractiveFlow";
import { InteractiveList } from "../components/triggers/InteractiveList";
import { TriggerDrawer } from "../components/triggers/TriggerDrawer";
import { useMobile } from "../hooks/useMobile";

const initialNodes: Node[] = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    type: "interactive-list",
    data: {
      type: "interactive",
      interactive: {
        type: "list",
        header: {
          type: "text",
          text: "Choose Shipping Option",
        },
        body: {
          text: "Which shipping option do you prefer?shipping option do you prefer?",
        },
        footer: {
          text: "Lucky Shrub: Your gateway to succulents™ Your gateway to succulents™",
        },
        action: {
          button: "Shipping Options",
          sections: [
            {
              title: "I want it ASAP!",
              rows: [
                {
                  id: "priority_express",
                  title: "Priority Mail Express",
                },
                {
                  id: "priority_mail",
                  title: "Priority Mail",
                },
              ],
            },
          ],
        },
      },
    },
  },
  {
    id: "2",
    position: { x: 400, y: 200 },
    type: "interactive-flow",
    data: {
      type: "interactive",
      interactive: {
        type: "flow",
        header: {
          type: "text",
          text: "values.header",
        },
        body: {
          text: "values.body",
        },
        footer: {
          text: "values.footer",
        },
        action: {
          name: "flow",
          parameters: {
            flow_message_version: "3",
            flow_token: "unused",
            flow_id: "x", //must choose
            mode: "draft",
            flow_cta: "click me button",
            flow_action: "navigate",
            flow_action_payload: {
              screen: "INITIAL",
            },
          },
        },
      },
    },
  },
];

const initialEdges: Edge[] = [{ id: "e1-2", source: "1", target: "2" }];

const nodeTypes = {
  "interactive-list": InteractiveList,
  "interactive-flow": InteractiveFlow,
  "interactive-buttons": InteractiveButtons,
};

export const TriggerPage = () => {
  const [, setLocation] = useLocation();
  const [isMatch] = useRoute("/trigger/controls");
  const isMobile = useMobile();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onNodeClick = (_: unknown, node: Node<unknown>) => {
    if (!isMobile) {
      setLocation(`/trigger/controls/${node.id}`);
    }
  };

  const onPaneClick = () => {
    if (!isMobile) {
      setLocation(`/trigger/controls/`);
    }
  };

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <Router base="/trigger">
      <ReactFlowProvider>
        <Route path="/:controls?/:id?">
          <Flex
            direction="column"
            w={isMatch && !isMobile ? "calc(70% - 70px)" : "100%"}
            h="100%"
          >
            <Flex
              p="md"
              h="60px"
              justify="space-between"
              align="center"
              gap="xs"
            >
              <Title order={3}>Trigger</Title>
              {isMobile ? (
                <ActionIcon
                  onClick={() =>
                    setLocation(isMatch ? "/trigger" : "/trigger/controls")
                  }
                  variant="transparent"
                  color="#666"
                  size="lg"
                >
                  <IconArrowRight
                    stroke="1.5"
                    style={{ width: "100%", height: "100%" }}
                  />
                </ActionIcon>
              ) : null}
            </Flex>
            <Divider />
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              elementsSelectable={true}
              onNodeClick={onNodeClick}
              onPaneClick={onPaneClick}
              nodeTypes={nodeTypes}
            >
              <MiniMap />
              <Controls />
              <Background />
            </ReactFlow>
          </Flex>
        </Route>
        <TriggerDrawer setNodes={setNodes} />
      </ReactFlowProvider>
    </Router>
  );
};
