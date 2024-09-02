import { ReactFlowProvider } from "@xyflow/react";

import { Route, Router, Switch } from "wouter";
import { ModalNodePicker } from "../components/bot/ModalNodePicker";

import { BotList } from "../components/bot/BotList";
import { DrawerNodeControl } from "../components/bot/DrawerNodeControl";
import { Flow } from "../components/bot/Flow";

export const BotPage = () => {
  return (
    <Router base="/bot">
      <Switch>
        <Route path=":flow_id/:section?/:id?">
          <ReactFlowProvider>
            <Flow />
            <DrawerNodeControl />
            <ModalNodePicker />
          </ReactFlowProvider>
        </Route>

        <Route>
          <BotList />
        </Route>
      </Switch>
    </Router>
  );
};
