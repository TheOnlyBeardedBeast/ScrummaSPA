import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import 'react-toastify/dist/ReactToastify.css';

import './poker.scss';
import Scrollbar from 'react-scrollbars-custom';
import { Result } from '../modules/result/Result';
import { observer, inject } from 'mobx-react';
import { PokerStore } from '../stores/PokerStore';
import { Options } from '../modules/options/Options';
import { Evaluation } from '../modules/evaluation/Evaluation';
import { PlanningInput } from '../modules/planningInput/PlanningInput';
import { HistoryList } from '../modules/historyList/HistoryList';
import { UserList } from '../modules/userList/UserList';
import { Title } from '../components/title/Title';

interface PokerProps {
    pokerStore?: PokerStore;
}

export const Poker: React.FC<PokerProps> = inject('pokerStore')(
    observer(({ pokerStore }) => {
        const { location, push } = useHistory();

        const onConnectionError = () => {
            return push('/');
        };

        useEffect(() => {
            const { name = undefined, role = 0, group = undefined } =
                location.state || {};

            if (!name || !group) {
                return push('/');
            }

            if (pokerStore) {
                pokerStore.initializeConnection(
                    name,
                    role,
                    group,
                    onConnectionError,
                );
            } else {
                push('/');
                return;
            }
        }, []);

        return (
            <div className="scrumma-group">
                <div className="history">
                    <Scrollbar removeTracksWhenNotUsed>
                        <Title light>History</Title>
                        <HistoryList />
                    </Scrollbar>
                </div>
                <div className="users">
                    <Scrollbar removeTracksWhenNotUsed>
                        <Title>Planning</Title>
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
        );
    }),
);
