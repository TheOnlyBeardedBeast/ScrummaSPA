import { computed } from 'mobx';
import { HubConnectionState } from '@aspnet/signalr';
import PokerStoreBase from './PokerStoreBase';

export class PokerStoreComputed extends PokerStoreBase {
    @computed public get isConnected(): boolean {
        return (
            !!this.connection &&
            this.connection.state === HubConnectionState.Connected
        );
    }

    @computed public get uniqueVotes(): Array<number> {
        return (this.self ? [...this.users, this.self] : this.users)
            .map(user => user.vote!)
            .filter(
                (vote, index, votes) =>
                    (!!vote || vote === 0) && votes.indexOf(vote) === index,
            );
    }

    @computed public get voters(): Array<IUser> {
        const voters = this.users.filter(user => user.role === 0);

        if (this.self && this.self.role === 0) {
            return [this.self, ...voters];
        }

        return voters;
    }

    @computed public get observers(): Array<IUser> {
        const observers = this.users.filter(user => user.role === 1);

        if (this.self && this.self.role === 1) {
            return [this.self, ...observers];
        }

        return observers;
    }

    @computed public get everybodyVoted(): boolean {
        return this.voters.every(({ vote }) => !!vote || vote === 0);
    }
}
