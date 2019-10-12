import React from 'react';
import { inject, observer } from 'mobx-react';
import { PokerStore } from '../../stores/PokerStore';
import { VoteIndicator } from '../../components/voteIndicator/VoteIndicator';
import './evaluation.scss';
import { Button } from '../../components/button/Button';

interface Evaluationprops {
    pokerStore?: PokerStore;
}

export const Evaluation: React.FC<Evaluationprops> = inject('pokerStore')(
    observer(({ pokerStore }) => {
        const { users, self, timer, title, addToHistory } = pokerStore!;
        const selfVoted = self && (!!self.vote || self.vote === 0);
        const usersVoted =
            users.length && users.every(user => !!user.vote || user.vote === 0);

        if (timer || (!selfVoted && !usersVoted)) {
            return null;
        }

        const handleEvaulationClick = (vote: number) => {
            addToHistory({ title, vote });
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
                <div className="evaulation-options">
                    {renderEvauluationOptions()}
                </div>
                <Button onClick={handleVoteAgain} block>
                    or Vote again
                </Button>
            </div>
        );
    }),
);
