import { observable, computed, action } from 'mobx';
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
} from '@aspnet/signalr';

export class PokerStore {
  @observable
  private _connection?: HubConnection = undefined;
  @computed
  public get connection(): HubConnection | undefined {
    return this._connection;
  }
  public set connection(v: HubConnection | undefined) {
    this._connection = v;
  }

  @computed
  public get isConnected(): boolean {
    return (
      !!this.connection &&
      this.connection.state === HubConnectionState.Connected
    );
  }

  @observable
  private _users: Array<IUser> = [];
  @computed
  public get users(): Array<IUser> {
    return this._users;
  }
  public set users(v: Array<IUser>) {
    this._users = v;
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

  @observable
  private _self?: IUser = undefined;
  @computed
  public get self(): IUser | undefined {
    return this._self;
  }
  public set self(v: IUser | undefined) {
    this._self = v;
  }

  //   seconds: 0,
  @observable
  private _seconds: number = 0;
  @computed
  public get seconds(): number {
    return this._seconds;
  }
  public set seconds(v: number) {
    this._seconds = v;
  }

  //     timer: undefined,
  @observable
  private _timer?: number = undefined;
  @computed
  public get timer(): number | undefined {
    return this._timer;
  }
  public set timer(v: number | undefined) {
    this._timer = v;
  }

  @action
  public initializeConnection = async (
    name: string,
    role: number,
    group: number,
  ) => {
    this.connection = new HubConnectionBuilder()
      .withUrl('http://localhost:5000/pokerhub')
      .build();

    try {
      await this.connection.start();
    } catch (error) {
      console.log(error);
    }

    if (!this.isConnected) {
      console.log('Oops something happened');
    }

    this.connection.send('OnJoin', { userName: name, role, group });

    this.connection.on('clientConnected', () => {
      console.log('client is connected');
    });

    this.connection.on('clientJoined', (user: IUser) => {
      this.users.push(user);
    });

    this.connection.on('selfJoined', (user: IUser) => {
      this.self = user;
    });

    this.connection.on('clientLeft', (connectionId: string) => {
      this.users = this.users.filter(
        user => user.connectionId !== connectionId,
      );
    });

    this.connection.on('clientSyncRequest', (connectionId: string) => {
      console.log('syncrequest');
      if (this.isConnected) {
        this.connection!.send(
          'OnSync',
          connectionId,
          this.self,
          this.timer ? this.seconds : null,
        );
      }
    });

    this.connection.on(
      'clientSyncResponse',
      (user: IUser, seconds?: number) => {
        console.log('syncresponse', user);
        if (!this.seconds && !!seconds) {
          this.startTimer(seconds);
        }

        this.users = [...this.users, user];
      },
    );

    this.connection.on('clientTimerStart', () => {
      !this.timer && this.startTimer(0);
      console.log('invoked start timer');
    });

    this.connection.on('clientTimerStop', () => {
      this.timer && this.stopTimer();
      console.log('invoked stop timer');
    });

    this.connection.on('clientVoted', (connectionId: string, num: number) => {
      console.log('client voted ' + num);

      const users = this.users.map(user => {
        if (user.connectionId !== connectionId) {
          return user;
        }
        return { ...user, vote: num };
      });

      this.users = users.sort((a, b) =>
        a.connectionId.localeCompare(b.connectionId),
      );
    });

    this.connection.on('clearVotes', () => {
      const clensedUsers = this.users.map(user => ({
        ...user,
        vote: undefined,
      }));
      this.self = { ...this.self!, vote: undefined };
      this.users = clensedUsers;
    });
  };

  @action
  timerTick = () => (this.seconds = this.seconds + 1);

  @action
  public startTimer = (initialSeconds?: number) => {
    this.seconds = initialSeconds || 0;
    this.timer = window.setInterval(this.timerTick, 1000);

    this.clearVotes();
  };

  @action
  stopTimer = () => {
    window.clearInterval(this.timer);
    this.timer = undefined;
    this.seconds = 0;
  };

  @action
  clearVotes = () => {
    if (this.isConnected) {
      this.connection!.invoke('OnClearVotes');
    }
  };

  @action
  toggleTimer = () => {
    if (!this.timer) {
      if (this.isConnected) {
        this.connection!.invoke('OnTimerStart');
      }
    } else {
      if (this.isConnected) {
        this.connection!.invoke('OnTimerStop');
      }
    }
  };

  @action
  public sync = (connectionId: string) => {
    if (this.isConnected) {
      this.connection!.send('onSync', connectionId, this.users);
    }
  };

  @action
  join = (username: string) => {
    if (this.isConnected) {
      this.connection!.send('OnJoin', username);
    }
  };

  @action
  vote = (num: number) => {
    this.self = { ...this.self!, vote: num };

    if (num === Infinity) {
      return this.connection!.send('OnVote', 1000);
    }

    this.connection!.send('OnVote', num);
  };
}
