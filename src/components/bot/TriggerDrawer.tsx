import { Drawer, ScrollArea } from "@mantine/core";
import "reactflow/dist/style.css";
import { Route, Switch, useRoute } from "wouter";
import { useMobile } from "../../hooks/useMobile";
import { TriggerDrawerNode } from "./TriggerDrawerNode";

export const TriggerDrawer = () => {
  const isMobile = useMobile();
  const [isMatch] = useRoute("/:id");

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
            <Route path="/:id">
              <TriggerDrawerNode />
            </Route>
          </Switch>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
};
