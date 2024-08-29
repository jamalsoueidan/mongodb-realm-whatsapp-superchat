import {
  ActionIcon,
  Box,
  Divider,
  Drawer,
  Flex,
  ScrollArea,
  Title,
} from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { Dispatch, SetStateAction } from "react";
import { Node } from "reactflow";
import "reactflow/dist/style.css";
import { Link, Route, Switch, useRoute } from "wouter";
import { useMobile } from "../../hooks/useMobile";
import { TriggerProvider } from "./TriggerProvider";

type Props = {
  setNodes: Dispatch<SetStateAction<Node<unknown, string | undefined>[]>>;
};

export const TriggerDrawer = (props: Props) => {
  const isMobile = useMobile();
  const [isMatch] = useRoute("/controls/:id?");

  return (
    <Drawer.Root
      position="right"
      size={isMobile ? "100%" : "30%"}
      opened={isMatch}
      onClose={() => {}}
      scrollAreaComponent={ScrollArea.Autosize}
    >
      <Drawer.Content>
        <Drawer.Body p="0">
          <Switch>
            <Route path="/controls/:id">
              <Flex
                px="sm"
                py="xs"
                h="60px"
                align="center"
                justify="space-between"
              >
                <Title order={4}>Interactive</Title>
                {isMobile ? (
                  <ActionIcon
                    variant="transparent"
                    aria-label="Back"
                    color="black"
                    component={Link}
                    to={`/`}
                  >
                    <IconX stroke={1.5} />
                  </ActionIcon>
                ) : null}
              </Flex>{" "}
              <Divider />
              <Box p="md">asd</Box>
            </Route>
            <Route>
              <Flex
                px="sm"
                py="xs"
                h="60px"
                align="center"
                justify="space-between"
              >
                <Title order={4}>Add an action</Title>
                {isMobile ? (
                  <ActionIcon
                    variant="transparent"
                    aria-label="Back"
                    color="black"
                    component={Link}
                    to={`/`}
                  >
                    <IconX stroke={1.5} />
                  </ActionIcon>
                ) : null}
              </Flex>
              <Divider />
              <Box p="md">
                <TriggerProvider setNodes={props.setNodes} />
              </Box>
            </Route>
          </Switch>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
};
