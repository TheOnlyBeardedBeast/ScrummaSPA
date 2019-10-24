import React from 'react';

import { ReactComponent as HistoryIcon } from 'assets/icons/history-min.svg';
import { ReactComponent as LogoutIcon } from 'assets/icons/logout-min.svg';
import { ReactComponent as PauseIcon } from 'assets/icons/pause-min.svg';

import { FloatingButton } from './FloatingButton';
import './floatingButtonBar.scss';

export const FloatingButtonBar: React.FC = () => {
    const handleOnHistoryClick = () => {
        window.location.hash =
            window.location.hash === '#history' ? 'planning' : 'history';
        console.log(window.location.hash);
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
            <FloatingButton name="pause">
                <PauseIcon />
            </FloatingButton>
            <FloatingButton name="logout">
                <LogoutIcon />
            </FloatingButton>
        </div>
    );
};
