import React from 'react';

import './voteIndicator.scss';

interface VoteIndicatorProps {
    showVote: boolean;
    vote?: number;
    onClick?: Function;
}

export const VoteIndicator: React.FC<VoteIndicatorProps> = ({
    showVote,
    vote,
    onClick,
}) => {
    const handleClick = () => {
        if (onClick) {
            onClick(vote);
        }
    };

    return (
        <div className="vote-indicator" onClick={handleClick}>
            <span>{showVote && vote}</span>
        </div>
    );
};
