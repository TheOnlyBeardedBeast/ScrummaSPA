import React from 'react';
import { inject, observer } from 'mobx-react';
import { PokerStore } from '../../stores/PokerStore';
import { VoteButton } from '../voteButton/VoteButton';
import './options.scss';

interface OptionsProps {
  pokerStore?: PokerStore;
}

const numbers: Array<number> = [0, 0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100, 1000];

export const Options: React.FC<OptionsProps> = inject('pokerStore')(
  observer(({ pokerStore }) => {
    const { users, self, timer } = pokerStore!;
    const selfVoted = self && (!!self.vote || self.vote === 0);
    const usersVoted =
      users.length && users.every(user => !!user.vote || user.vote === 0);

    if (!(timer || (!selfVoted && !usersVoted))) {
      return null;
    }

    const renderButtons = () => {
      if (!pokerStore!.timer) {
        return <span className="no-options">No running pointing</span>;
      }

      return numbers.map((num, index) => (
        <VoteButton key={index} num={num} onClick={pokerStore!.vote} />
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
