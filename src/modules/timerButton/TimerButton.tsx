import React from 'react';
import { inject, observer } from 'mobx-react';

import { PokerStore } from 'stores/PokerStore';
import { fmtMSS } from 'utils/helpers';
import { Button } from 'components';

interface TimerButtonProps {
    pokerStore?: PokerStore;
}

export const TimerButton: React.FC<TimerButtonProps> = inject('pokerStore')(
    observer(({ pokerStore }) => {
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
    }),
);
