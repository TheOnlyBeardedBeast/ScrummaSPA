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
    FloatingButtonBar,
    TitleBar,
} from 'modules';
import { Title, Tab, Button } from 'components';
import { useHash } from 'hooks';
import { useStores } from 'hooks/useStores';

import 'react-toastify/dist/ReactToastify.css';
import './poker.scss';

const hashOptions = ['#planning', '#history', '#pointing'];

export const Poker: React.FC = () => {
    const { pokerStore } = useStores();
    const hash = useHash(hashOptions, '#planning');
    const { location, push } = useHistory();

    useEffect(() => {
        const onConnectionError = () => {
            return push('/');
        };

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOnHistoryHideClick = () => (window.location.hash = 'planning');

    return useObserver(() => {
        return (
            <div className="scrumma-group">
                <HashSwitch hashOptions={hashOptions} currentHash={hash} />
                <FloatingButtonBar />
                <Tab
                    className="history section"
                    hash="#history"
                    currentHash={hash}
                >
                    <Scrollbar removeTracksWhenNotUsed>
                        <TitleBar>
                            <Title light>History</Title>
                            <Button
                                className="hide-history-button"
                                onClick={handleOnHistoryHideClick}
                            >
                                Hide
                            </Button>
                        </TitleBar>
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
