import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useObserver } from 'mobx-react';
import 'react-toastify/dist/ReactToastify.css';

import './poker.scss';
import Scrollbar from 'react-scrollbars-custom';
import { Result } from '../modules/result/Result';
import { Options } from '../modules/options/Options';
import { Evaluation } from '../modules/evaluation/Evaluation';
import { PlanningInput } from '../modules/planningInput/PlanningInput';
import { HistoryList } from '../modules/historyList/HistoryList';
import { UserList } from '../modules/userList/UserList';
import { Title } from '../components/title/Title';
import { useStores } from '../hooks/useStores';

export const Poker: React.FC = () => {
    const { pokerStore } = useStores();

    return useObserver(() => {
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
    });
};
