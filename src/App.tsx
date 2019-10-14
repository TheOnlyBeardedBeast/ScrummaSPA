import React from 'react';
import './App.scss';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

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
                <>
                    <ToastContainer position={toast.POSITION.TOP_CENTER} />
                    <Switch>
                        <Route exact path="/" component={PokerJoin} />
                        <Route exact path="/poker" component={Poker} />
                        <Route path="/:groupId" component={PokerJoin} />
                    </Switch>
                </>
            </Provider>
        </Router>
    );
};

export default App;
