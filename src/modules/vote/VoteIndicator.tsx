import React from "react";

interface VoteIndicatorProps {
  showVote: boolean;
  vote: number;
}

export const VoteIndicator: React.FC<VoteIndicatorProps> = ({
  showVote,
  vote
}) => (
  <div className="user-vote">
    <span>{showVote && vote}</span>
  </div>
);
