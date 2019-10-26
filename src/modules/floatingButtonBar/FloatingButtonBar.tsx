import React from 'react';

import { ReactComponent as HistoryIcon } from 'assets/icons/history-min.svg';
import { ReactComponent as LogoutIcon } from 'assets/icons/logout-min.svg';
import { ReactComponent as PauseIcon } from 'assets/icons/pause-min.svg';

import { FloatingButton } from './FloatingButton';
import './floatingButtonBar.scss';
import { useHistory } from 'react-router';
import { useStores } from 'hooks/useStores';

export const FloatingButtonBar: React.FC = () => {
    const { push } = useHistory();
    const { pokerStore } = useStores();

    const handleOnHistoryClick = () => {
        window.location.hash =
            window.location.hash === '#history' ? 'planning' : 'history';
    };

    const handleOnLogoutClick = () => {
        if (pokerStore.isConnected) {
            pokerStore.connection!.stop();
        }

        push('/join');
    };

    const handlePauseclick = () => {
        pokerStore.isConnected && pokerStore.connection!.send('OnPause');
    };

    return (
        <div className="poker-floating-buttons">
            <FloatingButton
                onClick={handleOnHistoryClick}
                name={`history${
                    window.location.hash === '#history' ? ' active' : ''
                }`}
            >
                <HistoryIcon />
            </FloatingButton>
            <FloatingButton name="pause" onClick={handlePauseclick}>
                <PauseIcon />
            </FloatingButton>
            <FloatingButton name="logout" onClick={handleOnLogoutClick}>
                <LogoutIcon />
            </FloatingButton>
        </div>
    );
};
