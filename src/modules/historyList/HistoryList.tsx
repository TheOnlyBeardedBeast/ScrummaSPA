import React from 'react';
import { inject, observer } from 'mobx-react';

import { PokerStore } from 'stores/PokerStore';

import { HistoryItem } from './HistoryItem';
import './historyList.scss';

interface HistoryListProps {
    pokerStore?: PokerStore;
}

export const HistoryList: React.FC<HistoryListProps> = inject('pokerStore')(
    observer(({ pokerStore }) => {
        const { history } = pokerStore!;

        const renderItems = () => {
            return history.map(({ title, vote }, index) => (
                <HistoryItem title={title} vote={vote} key={index} />
            ));
        };

        return <ul className="history-list">{renderItems()}</ul>;
    }),
);
