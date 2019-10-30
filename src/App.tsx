import React from 'react';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { PokerJoin, Poker, Home, Create, NotFound } from 'pages';

import './App.scss';

const history = createBrowserHistory();

const App: React.FC = () => {
    return (
        <Router history={history}>
            <>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/join/:groupId?" component={PokerJoin} />
                    <Route exact path="/create" component={Create} />
                    <Route exact path="/poker" component={Poker} />
                    <Route path="*" component={NotFound} />
                </Switch>
            </>
            <ToastContainer position={toast.POSITION.TOP_CENTER} />
        </Router>
    );
};

export default App;
