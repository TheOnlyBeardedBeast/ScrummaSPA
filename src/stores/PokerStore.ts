import { action } from 'mobx';
import debounce from "lodash.debounce";
import {
  HubConnectionBuilder,
} from '@aspnet/signalr';
import { PokerStoreComputed } from './PokerStoreComputed';

export class PokerStore extends PokerStoreComputed {
  @action public initializeConnection = async (
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
      console.log("invoked clear votes");

      const clensedUsers = this.users.map(user => ({
        ...user,
        vote: undefined,
      }));
      this.self = { ...this.self!, vote: undefined };
      this.users = clensedUsers;
    });

    this.connection.on("syncTitle",(title:string) => this.title = title);
  };

  @action timerTick = () => (this.seconds = this.seconds + 1);

  @action public startTimer = (initialSeconds: number = 0) => {
    this.seconds = initialSeconds;
    this.timer = window.setInterval(this.timerTick, 1000);

    if(!initialSeconds){
      this.clearVotes();
    }
  };

  @action stopTimer = () => {
    window.clearInterval(this.timer);
    this.timer = undefined;
    this.seconds = 0;
  };

  @action clearVotes = () => {
    if (this.isConnected) {
      this.connection!.invoke('OnClearVotes');
    }
  };

  @action toggleTimer = () => {
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

  @action public sync = (connectionId: string) => {
    if (this.isConnected) {
      this.connection!.send('onSync', connectionId, this.users);
    }
  };

  @action join = (username: string) => {
    if (this.isConnected) {
      this.connection!.send('OnJoin', username);
    }
  };

  @action vote = (num: number) => {
    this.self = { ...this.self!, vote: num };

    if (num === Infinity && this.isConnected) {
      return this.connection!.send('OnVote', 1000);
    }

    if(this.isConnected){
      this.connection!.send('OnVote', num);
    }
  };

  protected syncTitle = debounce(()=>{
    if(this.isConnected){
      this.connection!.send('OnSyncTitle', this.title);
    }
  },250);

  @action setTitle = (title: string) => {
    this.title = title;

    this.syncTitle();
  }
}
