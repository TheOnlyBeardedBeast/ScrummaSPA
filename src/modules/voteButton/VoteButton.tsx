import React from "react";

interface IVoteButton {
  num: number;
  onClick: Function;
}

export const VoteButton: React.FC<IVoteButton> = ({ num, onClick }) => {
  const handleOnClick = () => {
    onClick(num);
  };

  return (
    <div className="vote-button" onClick={handleOnClick}>
      <div>
        <span>{num === Infinity ? "?" : num}</span>
      </div>
    </div>
  );
};
