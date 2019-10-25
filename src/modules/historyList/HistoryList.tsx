import React from 'react';
import { useObserver } from 'mobx-react';

import { HistoryItem } from './HistoryItem';
import './historyList.scss';
import { useStores } from 'hooks/useStores';

export const HistoryList: React.FC = () => {
    const { pokerStore } = useStores();

    return useObserver(() => {
        const { history } = pokerStore!;

        if (!history.length) {
            return <span className="no-history">No history</span>;
        }

        const renderItems = () => {
            return history.map(({ title, vote }, index) => (
                <HistoryItem title={title} vote={vote} key={index} />
            ));
        };

        return <ul className="history-list">{renderItems()}</ul>;
    });
};
