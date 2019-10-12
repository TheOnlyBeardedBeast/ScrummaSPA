import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './poker.scss';
import { User } from '../modules/userList/User';
import Scrollbar from 'react-scrollbars-custom';
import { Result } from '../modules/result/Result';
import { observer, inject } from 'mobx-react';
import { PokerStore } from '../stores/PokerStore';
import { Options } from '../modules/options/Options';
import { Evaluation } from '../modules/evaluation/Evaluation';
import { PlanningInput } from '../modules/planningInput/PlanningInput';
import { HistoryList } from '../modules/historyList/HistoryList';
import { UserList } from '../modules/userList/UserList';

interface PokerProps extends RouteComponentProps<any> {
    pokerStore?: PokerStore;
}

@inject('pokerStore')
@observer
class PokerPage extends React.Component<PokerProps, {}> {
    componentDidMount = async () => {
        const { location, history, pokerStore } = this.props;
        const { name = undefined, role = 0, group = undefined } =
            location.state || {};

        if (!name || !group) {
            history.push('/');
            return;
        }

        if (pokerStore) {
            pokerStore.initializeConnection(name, role, group);
        } else {
            history.push('/');
            return;
        }
    };

    render() {
        return (
            <>
                <ToastContainer position={toast.POSITION.TOP_CENTER} />
                <div className="scrumma-group">
                    <div className="history">
                        <Scrollbar removeTracksWhenNotUsed>
                            <span className="title light">History</span>
                            <HistoryList />
                        </Scrollbar>
                    </div>
                    <div className="users">
                        <Scrollbar removeTracksWhenNotUsed>
                            <span className="title">Planning</span>
                            <PlanningInput />
                            <UserList role="voters" />
                            <UserList role="observers" />
                        </Scrollbar>
                    </div>
                    <div className="vote-options">
                        <Scrollbar removeTracksWhenNotUsed>
                            <Options />
                            <Result />
                            <Evaluation />
                        </Scrollbar>
                    </div>
                </div>
            </>
        );
    }
}

export const Poker = withRouter(PokerPage);
