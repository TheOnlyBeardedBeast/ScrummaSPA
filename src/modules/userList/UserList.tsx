import React from 'react';
import { useObserver } from 'mobx-react';

import { capitalize } from 'utils/helpers';
import { User } from './User';
import { useStores } from 'hooks/useStores';

interface UserListProps {
    role: 'voters' | 'observers';
}

export const UserList: React.FC<UserListProps> = ({ role }) => {
    const { pokerStore } = useStores();

    return useObserver(() => {
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
    });
};
