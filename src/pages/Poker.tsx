import React from 'react';
import './poker.scss';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { User } from '../modules/vote/User';
import Scrollbar from 'react-scrollbars-custom';
import { Result } from '../modules/result/Result';
import { observer, inject } from 'mobx-react';
import { PokerStore } from '../stores/PokerStore';
import { Options } from '../modules/options/Options';
import { Evaluation } from '../modules/evaluation/Evaluation';

interface PokerState {}

interface PokerProps extends RouteComponentProps<any> {
  pokerStore?: PokerStore;
}

@inject('pokerStore')
@observer
class PokerPage extends React.Component<PokerProps, PokerState> {
  componentDidMount = async () => {
    const { location, history, pokerStore } = this.props;
    const { name = undefined, role = 0, group = undefined } =
      location.state || {};

    if (!name || !group) {
      history.push('/');
      return;
    }

    console.log(this.props.pokerStore);

    if (pokerStore) {
      pokerStore.initializeConnection(name, role, group);
    } else {
      history.push('/');
      return;
    }
  };

  handleTimerClick = () => {
    this.props.pokerStore!.toggleTimer();
  };

  renderSelf = () => {
    const { self, timer } = this.props.pokerStore!;

    if (self) {
      return <User user={self} showVote={true} timer={timer} />;
    }

    return null;
  };

  renderUsers = () => {
    const { users, timer } = this.props.pokerStore!;

    return users.map((user, index) => (
      <User key={index} user={user} showVote={!timer} timer={timer} />
    ));
  };

  fmtMSS = (s: number) => (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s;

  renderTime = () => {
    const { seconds } = this.props.pokerStore!;

    return (
      <>
        <span className="time">{this.fmtMSS(seconds)}</span>&nbsp;
        <span className="stop">Stop</span>
      </>
    );
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
                {this.props.pokerStore!.timer ? this.renderTime() : 'Start'}
              </button>
            </div>
            <span className="title">Voters</span>
            {this.renderSelf()}
            {this.renderUsers()}
          </Scrollbar>
        </div>
        <div className="vote-options">
          <Scrollbar removeTracksWhenNotUsed>
            <Options />
            <Result />
            <Evaluation />
          </Scrollbar>
        </div>
      </div>
    );
  }
}

export const Poker = withRouter(PokerPage);
