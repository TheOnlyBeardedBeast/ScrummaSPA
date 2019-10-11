import {  computed } from 'mobx';
import {
  HubConnectionState,
} from '@aspnet/signalr';
import PokerStoreBase from './PokerStoreBase';

export class PokerStoreComputed extends PokerStoreBase {
  @computed
  public get isConnected(): boolean {
    return (
      !!this.connection &&
      this.connection.state === HubConnectionState.Connected
    );
  }

  @computed
  public get uniqueVotes(): Array<number> {
    return (this.self ? [...this.users, this.self] : this.users)
      .map(user => user.vote!)
      .filter(
        (vote, index, votes) =>
          (!!vote || vote === 0) && votes.indexOf(vote) === index,
      );
  }
}