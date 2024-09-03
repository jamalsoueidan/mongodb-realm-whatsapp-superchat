import { Route, Router, Switch } from "wouter";

import { BotList } from "../components/bot/BotList";
import { BotView } from "../components/bot/BotView";

export const BotPage = () => {
  return (
    <Router base="/bot">
      <Switch>
        <Route path=":flowId/:section?/:id?">
          <BotView />
        </Route>

        <Route>
          <BotList />
        </Route>
      </Switch>
    </Router>
  );
};
