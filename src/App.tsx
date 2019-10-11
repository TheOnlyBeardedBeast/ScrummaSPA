import React from 'react';
import './App.scss';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';

import { PokerJoin } from './pages/PokerJoin';
import { Poker } from './pages/Poker';
import { Provider } from 'mobx-react';
import { PokerStore } from './stores/PokerStore';

const history = createBrowserHistory();

const stores = {
  pokerStore: new PokerStore(),
};

const App: React.FC = () => {
  return (
    <Router history={history}>
      <Provider pokerStore={stores.pokerStore}>
        <Switch>
          <Route exact path="/" component={PokerJoin} />
          <Route exact path="/poker" component={Poker} />
        </Switch>
      </Provider>
    </Router>
  );
};

export default App;
