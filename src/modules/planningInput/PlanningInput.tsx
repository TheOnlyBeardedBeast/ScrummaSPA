import React from 'react';
import { useObserver } from 'mobx-react';

import { TimerButton } from 'modules';
import './planningInput.scss';
import { useStores } from 'hooks/useStores';

export const PlanningInput: React.FC = () => {
    const { pokerStore } = useStores();

    return useObserver(() => {
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
    });
};
