import React from 'react';

import './voteIndicator.scss';

interface VoteIndicatorProps {
    showVote: boolean;
    vote?: number;
    onClick?: Function;
    tabIndex?: number;
}

export const VoteIndicator: React.FC<VoteIndicatorProps> = ({
    showVote,
    vote,
    onClick,
    tabIndex,
}) => {
    const handleClick = () => {
        if (onClick) {
            onClick(vote);
        }
    };

    const voteValue = vote === 1000 ? '?' : vote;

    return (
        <div
            className="vote-indicator"
            onClick={handleClick}
            tabIndex={tabIndex}
        >
            <span>{showVote && voteValue}</span>
        </div>
    );
};
