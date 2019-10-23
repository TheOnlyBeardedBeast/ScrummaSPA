import React from 'react';
import { useObserver } from 'mobx-react';

import { fmtMSS } from 'utils/helpers';
import { Button } from 'components';
import { useStores } from 'hooks/useStores';

export const TimerButton: React.FC = () => {
    const { pokerStore } = useStores();

    return useObserver(() => {
        const { seconds, timer, toggleTimer } = pokerStore!;

        const renderTime = () => {
            return (
                <>
                    <span className="time">{fmtMSS(seconds)}</span>&nbsp;
                    <span className="stop">Stop</span>
                </>
            );
        };

        return (
            <Button onClick={toggleTimer} tabIndex={100}>
                {timer ? renderTime() : 'Start'}
            </Button>
        );
    });
};
