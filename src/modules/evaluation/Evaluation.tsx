import React from 'react';
import { inject, observer } from 'mobx-react';
import { PokerStore } from '../../stores/PokerStore';
import { VoteIndicator } from '../vote/VoteIndicator';
import './evaluation.scss';

interface Evaluationprops {
  pokerStore?: PokerStore;
}

export const Evaluation: React.FC<Evaluationprops> = inject('pokerStore')(
  observer(({ pokerStore }) => {
    const { users, self, timer } = pokerStore!;
    const selfVoted = self && (!!self.vote || self.vote === 0);
    const usersVoted =
      users.length && users.every(user => !!user.vote || user.vote === 0);

    if (timer || (!selfVoted && !usersVoted)) {
      return null;
    }

    const handleEvaulationClick = (vote: number) => {
      // pokerstore!.addHistory(vote);
      pokerStore!.clearVotes();
    };

    const renderEvauluationOptions = () =>
      pokerStore!.uniqueVotes.map((vote, index) => (
        <VoteIndicator
          key={`vote_${index}`}
          vote={vote}
          showVote={true}
          onClick={handleEvaulationClick}
        />
      ));

    const handleVoteAgain = () => {
      pokerStore!.clearVotes();
      pokerStore!.toggleTimer();
    };

    return (
      <div className="evaulations">
        <span className="title">Choose</span>
        <div className="evaulation-options">{renderEvauluationOptions()}</div>
        <button onClick={handleVoteAgain}>Vote again!</button>
      </div>
    );
  }),
);
