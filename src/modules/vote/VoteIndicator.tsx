import React from 'react';

interface VoteIndicatorProps {
  showVote: boolean;
  vote: number;
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
    <div className="user-vote" onClick={handleClick}>
      <span>{showVote && vote}</span>
    </div>
  );
};
