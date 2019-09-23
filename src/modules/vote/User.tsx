import React from 'react';

import './user.scss';

interface VoteProps {
  user: IUser;
  showVote: boolean;
  timer?: number;
}

export const User: React.FC<VoteProps> = ({ user, showVote, timer }) => {
  const { userName, vote } = user;

  return (
    <div className="user">
      <div className="user-info">
        <span>{userName}</span>
        <span>email@email.sk</span>
      </div>
      {timer && (
        <div>
          <span>{!!vote || vote === 0 ? 'Voted' : 'Waiting'}</span>
        </div>
      )}
      <div className="user-vote">
        <span>{showVote && vote}</span>
      </div>
    </div>
  );
};
