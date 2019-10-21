import React from 'react';
import { inject, observer } from 'mobx-react';

import { PokerStore } from 'stores/PokerStore';

import { TimerButton } from 'modules';
import './planningInput.scss';

interface PlanningInputProps {
    pokerStore?: PokerStore;
}

export const PlanningInput: React.FC<PlanningInputProps> = inject('pokerStore')(
    observer(({ pokerStore }) => {
        const { title, timer, setTitle, everybodyVoted, voters } = pokerStore!;

        const classNames = `planning-input ${
            !!timer || (!timer && everybodyVoted && voters.length > 0)
                ? ' disabled'
                : ''
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
                    tabIndex={0}
                />
                <TimerButton />
            </div>
        );
    }),
);
