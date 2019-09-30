import React from 'react';
import {
  HubConnectionBuilder,
  HubConnection,
  HubConnectionState,
} from '@aspnet/signalr';
import './poker.scss';
import { VoteButton } from '../modules/voteButton/VoteButton';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { User } from '../modules/vote/User';
import Scrollbar from 'react-scrollbars-custom';
import { Result } from '../modules/result/Result';

interface PokerState {
  self?: IUser;
  connection?: HubConnection;
  users: Array<IUser>;
  seconds: number;
  timing: boolean;
  timer?: number;
}

interface PokerProps extends RouteComponentProps<any> {}

const numbers: Array<number> = [
  0,
  0.5,
  1,
  2,
  3,
  5,
  8,
  13,
  20,
  40,
  100,
  Infinity,
];

class PokerPage extends React.Component<PokerProps, PokerState> {
  state: PokerState = {
    connection: undefined,
    users: new Array<IUser>(),
    self: undefined,
    timing: false,
    seconds: 0,
    timer: undefined,
  };

  componentDidMount = async () => {
    const { location, history } = this.props;
    const { name = undefined } = location.state || {};

    if (!name) {
      history.push('/');
      return;
    }

    const connection = new HubConnectionBuilder()
      .withUrl('http://localhost:5000/pokerhub')
      .build();

    try {
      await connection.start();
    } catch (error) {
      console.log(error);
    }

    if (connection.state === HubConnectionState.Disconnected) {
      return;
    }

    this.setState({
      connection,
    });

    connection.send('OnJoin', this.props.location.state.name);

    connection.on('clientConnected', () => {
      console.log('client is connected');
    });

    connection.on('clientJoined', (user: IUser) => {
      this.setState({ users: [...this.state.users, user] });
    });

    connection.on('selfJoined', (user: IUser) => {
      this.setState({ self: user });
    });

    connection.on('clientLeft', (connectionId: string) => {
      console.log('a cleint left');
      this.setState({
        users: this.state.users.filter(
          user => user.connectionId !== connectionId,
        ),
      });
    });

    connection.on('clientSyncRequest', (connectionId: string) => {
      console.log('syncrequest');
      connection.send(
        'OnSync',
        connectionId,
        this.state.self,
        this.state.timer ? this.state.seconds : null,
      );
    });

    connection.on('clientSyncResponse', (user: IUser, seconds?: number) => {
      console.log('syncresponse', user);
      if (!this.state.seconds && !!seconds) {
        this.startTimer(seconds);
      }
      this.setState({
        users: [...this.state.users, user],
      });
    });

    connection.on('clientTimerStart', () => {
      !this.state.timer && this.startTimer(0);
      console.log('invoked start timer');
    });

    connection.on('clientTimerStop', () => {
      this.state.timer && this.stopTimer();
      console.log('invoked stop timer');
    });

    connection.on('clientVoted', (connectionId: string, num: number) => {
      console.log('client voted ' + num);

      const users = this.state.users.map(user => {
        if (user.connectionId !== connectionId) {
          return user;
        }
        return { ...user, vote: num };
      });

      this.setState({
        users: users.sort((a, b) =>
          a.connectionId.localeCompare(b.connectionId),
        ),
      });
    });

    connection.on('clearVotes', () => {
      const { self, users }: PokerState = this.state;

      const clensedUsers = users.map(user => ({ ...user, vote: undefined }));

      this.setState({
        self: { ...self!, vote: undefined },
        users: clensedUsers,
      });
    });
  };

  sync = (connectionId: string) => {
    const { connection, users }: PokerState = this.state;

    if (connection!.state === HubConnectionState.Connected) {
      connection!.send('onSync', connectionId, users);
    }
  };

  join = async (username: string) => {
    const { connection }: PokerState = this.state;

    if (connection!.state === HubConnectionState.Connected) {
      connection!.send('OnJoin', username);
    }
  };

  vote = (num: number) => {
    const { connection, self }: PokerState = this.state;

    this.setState({ self: { ...self!, vote: num } });

    if (num === Infinity) {
      return connection!.send('OnVote', 1000);
    }

    connection!.send('OnVote', num);
  };

  startTimer = (initialSeconds?: number) => {
    this.setState({
      seconds: initialSeconds || 0,
      timer: window.setInterval(this.timerTick, 1000),
    });

    this.clearVotes();
  };

  stopTimer = () => {
    window.clearInterval(this.state.timer);
    this.setState({
      timer: undefined,
      seconds: 0,
    });
  };

  toggleTimer = () => {
    const { connection }: PokerState = this.state;

    if (!this.state.timer) {
      if (connection!.state === HubConnectionState.Connected) {
        connection!.invoke('OnTimerStart');
      }
    } else {
      if (connection!.state === HubConnectionState.Connected) {
        connection!.invoke('OnTimerStop');
      }
    }
  };

  timerTick = () => {
    this.setState({
      seconds: this.state.seconds + 1,
    });
  };

  clearVotes = () => {
    const { connection }: PokerState = this.state;

    if (connection && connection!.state === HubConnectionState.Connected) {
      connection!.invoke('OnClearVotes');
    }
  };

  handleTimerClick = () => {
    this.toggleTimer();
  };

  renderButtons = () =>
    numbers.map((num, index) => (
      <VoteButton key={index} num={num} onClick={this.vote} />
    ));

  renderSelf = () => {
    const { self, timer }: PokerState = this.state;

    if (self) {
      return <User user={self} showVote={true} timer={timer} />;
    }

    return null;
  };

  renderUsers = () => {
    const { users, timer }: PokerState = this.state;

    return users.map((user, index) => (
      <User key={index} user={user} showVote={!timer} timer={timer} />
    ));
  };

  fmtMSS = (s: number) => (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s;

  renderTime = () => {
    const { seconds }: PokerState = this.state;

    return this.fmtMSS(seconds);
  };

  renderResult = (): JSX.Element | null => {
    const { users, self, timer } = this.state;

    if (
      !timer &&
      (users.some(user => !!user.vote || user.vote === 0) ||
        (self && (!!self.vote || self.vote === 0)))
    ) {
      return (
        <>
          <span className="title">Result</span>
          <Result users={users} self={self} />
        </>
      );
    }

    return null;
  };

  render() {
    return (
      <div className="scrumma-group">
        <div className="history">
          <Scrollbar removeTracksWhenNotUsed>
            <span className="title light">History</span>
          </Scrollbar>
        </div>
        <div className="users">
          <Scrollbar removeTracksWhenNotUsed>
            <span className="title">Planning</span>
            <div className="story-input">
              <input type="text" />
              <button onClick={this.handleTimerClick}>
                {this.state.timer ? this.renderTime() : 'Start'}
              </button>
            </div>
            <span className="title">Voters</span>
            {this.renderSelf()}
            {this.renderUsers()}
            {this.renderResult()}
          </Scrollbar>
        </div>
        <div className="vote-options">
          <Scrollbar removeTracksWhenNotUsed>
            <span className="title">User</span>
            <div className="options">
              {this.state.timer ? this.renderButtons() : 'No running voting'}
            </div>
          </Scrollbar>
        </div>
      </div>
    );
  }
}

export const Poker = withRouter(PokerPage);
