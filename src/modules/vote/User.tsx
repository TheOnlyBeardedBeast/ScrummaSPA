import React from "react";

import "./user.scss";

interface VoteProps {
  user: IUser;
  showVote: boolean;
}

export const User: React.FC<VoteProps> = ({ user, showVote }) => {
  const { userName, vote } = user;

  return (
    <div className="user">
      <div className="user-info">
        <span>{userName}</span>
        <span>email@email.sk</span>
      </div>
      <div className="user-vote">
        <span>{showVote && vote}</span>
      </div>
    </div>
  );
};
