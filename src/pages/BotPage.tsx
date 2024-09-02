import { ReactFlowProvider } from "@xyflow/react";

import { Route, Router } from "wouter";
import { ModalNodePicker } from "../components/bot/ModalNodePicker";

import { DrawerNodeControl } from "../components/bot/DrawerNodeControl";
import { Flow } from "../components/bot/Flow";

export const BotPage = () => {
  return (
    <Router base="/bot">
      <ReactFlowProvider>
        <Route path="/:action?/:id?">
          <Flow />
        </Route>
        <DrawerNodeControl />
        <ModalNodePicker />
      </ReactFlowProvider>
    </Router>
  );
};
