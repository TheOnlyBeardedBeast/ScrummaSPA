import React from 'react';
import { VoteIndicator } from '../../components/voteIndicator/VoteIndicator';

interface HistoryItemProps extends IHistoryItem {}

export const HistoryItem: React.FC<HistoryItemProps> = ({ title, vote }) => (
    <li className="history-item">
        <span className="history-item-title">{title}</span>
        <VoteIndicator vote={vote} showVote={true} />
    </li>
);
