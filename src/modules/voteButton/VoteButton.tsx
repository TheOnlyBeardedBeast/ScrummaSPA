import React from 'react';

interface IVoteButton {
    num: number;
    onClick: Function;
    tabIndex?: number;
}

export const VoteButton: React.FC<IVoteButton> = ({
    num,
    onClick,
    tabIndex,
}) => {
    const handleOnClick = () => {
        onClick(num);
    };

    return (
        <div
            className="vote-button"
            onClick={handleOnClick}
            tabIndex={tabIndex}
        >
            <div>
                <span>{num === 1000 ? '?' : num}</span>
            </div>
        </div>
    );
};
