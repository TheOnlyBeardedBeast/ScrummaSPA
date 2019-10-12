import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './poker.scss';
import { User } from '../modules/vote/User';
import Scrollbar from 'react-scrollbars-custom';
import { Result } from '../modules/result/Result';
import { observer, inject } from 'mobx-react';
import { PokerStore } from '../stores/PokerStore';
import { Options } from '../modules/options/Options';
import { Evaluation } from '../modules/evaluation/Evaluation';
import { PlanningInput } from '../modules/planningInput/PlanningInput';
import { HistoryList } from '../modules/historyList/HistoryList';

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

    renderSelf = () => {
        const { self, timer } = this.props.pokerStore!;

        if (self) {
            return <User user={self} showVote={true} timer={timer} />;
        }

        return null;
    };

    renderUsers = () => {
        const { users, timer } = this.props.pokerStore!;

        return users.map((user, index) => (
            <User key={index} user={user} showVote={!timer} timer={timer} />
        ));
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
                            <span className="title">Voters</span>
                            {this.renderSelf()}
                            {this.renderUsers()}
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
