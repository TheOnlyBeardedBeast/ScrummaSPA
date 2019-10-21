import React from 'react';
import { inject, observer } from 'mobx-react';

import { PokerStore } from 'stores/PokerStore';
import { capitalize } from 'utils/helpers';
import { User } from './User';

interface UserListProps {
    role: 'voters' | 'observers';
    pokerStore?: PokerStore;
}

export const UserList: React.FC<UserListProps> = inject('pokerStore')(
    observer(({ pokerStore, role }) => {
        const { observers, voters, timer, self } = pokerStore!;

        const mapping = {
            voters: voters,
            observers: observers,
        };

        const renderContent = () => {
            const renderable = mapping[role] || observers;

            return renderable.map((user, index) => (
                <User
                    key={index}
                    user={user}
                    showVote={
                        !timer || self!.connectionId === user.connectionId
                    }
                    timer={timer}
                />
            ));
        };

        return (
            <>
                <span className="title">{capitalize(role)}</span>
                {renderContent()}
            </>
        );
    }),
);
