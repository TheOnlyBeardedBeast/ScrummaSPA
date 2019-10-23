import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useObserver } from 'mobx-react';
import Scrollbar from 'react-scrollbars-custom';

import {
    Result,
    UserList,
    Options,
    Evaluation,
    PlanningInput,
    HistoryList,
    HashSwitch,
} from 'modules';
import { useHash } from 'hooks';
import { Title, Tab } from 'components';

import 'react-toastify/dist/ReactToastify.css';
import './poker.scss';
import { useStores } from 'hooks/useStores';

const hashOptions = ['#planning', '#history', '#pointing'];

export const Poker: React.FC = () => {
    const { pokerStore } = useStores();

    const { location, push } = useHistory();
    const hash = useHash(hashOptions, '#planning');

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

    return useObserver(() => {
        return (
            <div className="scrumma-group">
                <HashSwitch hashOptions={hashOptions} currentHash={hash} />
                <Tab
                    className="history section"
                    hash="#history"
                    currentHash={hash}
                >
                    <Scrollbar removeTracksWhenNotUsed>
                        <Title light>History</Title>
                        <HistoryList />
                    </Scrollbar>
                </Tab>
                <Tab
                    className="users section"
                    hash="#planning"
                    currentHash={hash}
                >
                    <Scrollbar removeTracksWhenNotUsed>
                        <Title>Planning</Title>
                        <PlanningInput />
                        <UserList role="voters" />
                        <UserList role="observers" />
                    </Scrollbar>
                </Tab>
                <Tab
                    className="vote-options section"
                    hash="#pointing"
                    currentHash={hash}
                >
                    <Scrollbar removeTracksWhenNotUsed>
                        <Options />
                        <Result />
                        <Evaluation />
                    </Scrollbar>
                </Tab>
            </div>
        );
    });
};
