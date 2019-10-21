import React from 'react';
import { inject, observer } from 'mobx-react';

import { PokerStore } from 'stores/PokerStore';

import { VoteButton } from 'modules';
import './options.scss';

interface OptionsProps {
    pokerStore?: PokerStore;
}

const numbers: Array<number> = [0, 0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100, 1000];

export const Options: React.FC<OptionsProps> = inject('pokerStore')(
    observer(({ pokerStore }) => {
        const { everybodyVoted, timer, self, vote } = pokerStore!;

        if (!(timer || !everybodyVoted)) {
            return null;
        }

        const renderButtons = () => {
            if (!timer) {
                return <span className="no-options">No running pointing</span>;
            }

            if (self && self.role !== 0) {
                return (
                    <span className="no-options">
                        Waiting for voters to vote
                    </span>
                );
            }

            return numbers.map((num, index) => (
                <VoteButton
                    key={index}
                    num={num}
                    onClick={vote}
                    tabIndex={index + 200}
                />
            ));
        };

        return (
            <>
                <span className="title">Pointing</span>
                <div className="options">{renderButtons()}</div>
            </>
        );
    }),
);
