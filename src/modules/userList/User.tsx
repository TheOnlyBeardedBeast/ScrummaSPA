import React from 'react';

import './user.scss';
import { VoteIndicator } from '../../components/voteIndicator/VoteIndicator';

interface VoteProps {
    user: IUser;
    showVote: boolean;
    timer?: number;
}

export const User: React.FC<VoteProps> = ({ user, showVote, timer }) => {
    const { userName, vote, role } = user;

    const renderVoteStatus = () =>
        timer && (
            <div>
                <span>{!!vote || vote === 0 ? 'Voted' : 'Waiting'}</span>
            </div>
        );

    return (
        <div className="user">
            <div className="user-info">
                <span>{userName}</span>
                {/* <span>email@email.sk</span> */}
            </div>
            {renderVoteStatus()}
            {role === 0 && <VoteIndicator vote={vote} showVote={showVote} />}
        </div>
    );
};
