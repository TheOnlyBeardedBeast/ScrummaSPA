import React from 'react';
import { useObserver } from 'mobx-react';

import { HistoryItem } from './HistoryItem';
import './historyList.scss';
import { useStores } from 'hooks/useStores';

export const HistoryList: React.FC = () => {
    const { pokerStore } = useStores();

    return useObserver(() => {
        const renderItems = () => {
            const { history } = pokerStore!;

            return history.map(({ title, vote }, index) => (
                <HistoryItem title={title} vote={vote} key={index} />
            ));
        };

        return <ul className="history-list">{renderItems()}</ul>;
    });
};
