import React from "react";
import "./App.scss";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import { PokerJoin } from "./pages/PokerJoin";
import { Poker } from "./pages/Poker";

const history = createBrowserHistory();

const App: React.FC = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={PokerJoin} />
        <Route exact path="/poker" component={Poker} />
      </Switch>
    </Router>
  );
};

export default App;
