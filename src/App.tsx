import React from 'react';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { PokerJoin, Poker } from 'pages';

import './App.scss';

const history = createBrowserHistory();

const App: React.FC = () => {
    return (
        <Router history={history}>
            <>
                <ToastContainer position={toast.POSITION.TOP_CENTER} />
                <Switch>
                    <Route exact path="/" component={PokerJoin} />
                    <Route exact path="/poker" component={Poker} />
                    <Route path="/:groupId" component={PokerJoin} />
                </Switch>
            </>
        </Router>
    );
};

export default App;
