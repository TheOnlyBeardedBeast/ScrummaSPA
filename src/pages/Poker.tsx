import React from 'react';
import { HubConnectionBuilder, HubConnection } from '@aspnet/signalr';
import './poker.scss';
import { VoteButton } from '../modules/voteButton/VoteButton';

interface IVote {
  connectionId: string;
  vote?: number;
}

interface PokerState {
  connection?: HubConnection;
  votes: Array<IVote>;
}

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

export class Poker extends React.Component<any, PokerState> {
  state = {
    connection: undefined,
    votes: new Array<IVote>(),
  };

  componentDidMount = () => {
    const connection = new HubConnectionBuilder()
      .withUrl('http://localhost:5000/pokerhub')
      .build();

    connection
      .start()
      .then(() => console.log('works'))
      .catch(error => console.log(error));

    this.setState({
      connection,
    });

    if (connection) {
      connection.on('clientConnected', () => {
        console.log('client is connected');
      });

      connection.on('clientVoted', (connectionId: string, num: number) => {
        console.log('client voted ' + num);

        const othersVote = this.state.votes.filter(
          vote => vote.connectionId !== connectionId,
        );

        this.setState({
          votes: [...othersVote, { connectionId, vote: num }].sort((a, b) =>
            a.connectionId.localeCompare(b.connectionId),
          ),
        });
      });
    }
  };

  vote = (num: number) => {
    const { connection }: PokerState = this.state;

    if (num === Infinity) {
      return connection!.send('OnVote', 1000);
    }

    connection!.send('OnVote', num);
  };

  renderButtons = () =>
    numbers.map((num, index) => (
      <VoteButton key={index} num={num} onClick={this.vote} />
    ));

  renderVotes = () => {
    const { votes } = this.state;
    console.log(votes);

    return votes.map(({ connectionId, vote }) => (
      <div>{`${connectionId}:${vote}`}</div>
    ));
  };

  render() {
    return (
      <div className="scrumma-group">
        <div className="history">History</div>
        <div className="votes">{this.renderVotes()}</div>
        <div className="options">{this.renderButtons()}</div>
      </div>
    );
  }
}
