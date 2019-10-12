import React from 'react';
import { inject, observer } from 'mobx-react';

import { PokerStore } from '../../stores/PokerStore';
import { TimerButton } from '../timerButton/TimerButton';

import './planningInput.scss';

interface PlanningInputProps {
    pokerStore?: PokerStore;
}

export const PlanningInput: React.FC<PlanningInputProps> = inject('pokerStore')(
    observer(({ pokerStore }) => {
        const { title, timer, setTitle, everybodyVoted } = pokerStore!;

        const classNames = `planning-input ${
            !!timer || (!timer && everybodyVoted) ? ' disabled' : ''
        }`;

        const handleInputChange = (
            event: React.ChangeEvent<HTMLInputElement>,
        ) => {
            setTitle(event.target.value);
        };

        return (
            <div className={classNames}>
                <input
                    className="planning-input-field"
                    type="text"
                    onChange={handleInputChange}
                    value={title}
                />
                <TimerButton />
            </div>
        );
    }),
);
