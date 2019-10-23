import React from 'react';
import { useObserver } from 'mobx-react';

import { Button, VoteIndicator } from 'components';
import './evaluation.scss';
import { useStores } from 'hooks/useStores';

export const Evaluation: React.FC = () => {
    const { pokerStore } = useStores();

    return useObserver(() => {
        const { users, self, timer, title, addToHistory } = pokerStore!;
        const selfVoted = self && (!!self.vote || self.vote === 0);
        const usersVoted =
            users.length && users.every(user => !!user.vote || user.vote === 0);

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
                    tabIndex={index + 300}
                />
            ));

        const handleVoteAgain = () => {
            pokerStore!.clearVotes();
            pokerStore!.toggleTimer();
        };

        if (timer || (!selfVoted && !usersVoted)) {
            return null;
        }

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
    });
};
