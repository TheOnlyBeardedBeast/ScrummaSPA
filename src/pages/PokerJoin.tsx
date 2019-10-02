import React, { useState, ChangeEvent, FormEvent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import './join.scss';

interface PokerJoinProps extends RouteComponentProps<any> {}

export const PokerJoinPage: React.FC<PokerJoinProps> = ({ history }) => {
  const [name, setName] = useState<string>('');
  const [group, setGroup] = useState<string>('');
  const [isObserver, setIsObserver] = useState<boolean>(false);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;

    setName(target.value);
  };

  const handleGroupChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;

    setGroup(target.value);
  };

  const handleIsObserverChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;

    setIsObserver(target.checked);
  };

  const handleJoin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    history.push('/poker', { name, role: isObserver ? 1 : 0, group });
  };

  return (
    <div className="join">
      <form onSubmit={handleJoin}>
        <label>Name</label>
        <input type="text" onChange={handleNameChange} value={name} />
        <label>Group id</label>
        <input type="text" onChange={handleGroupChange} value={group} />
        <label>
          <span>Observer</span>
          <input
            type="checkbox"
            checked={isObserver}
            onChange={handleIsObserverChange}
          />
        </label>
        <button type="submit">Join</button>
      </form>
    </div>
  );
};

export const PokerJoin = withRouter(PokerJoinPage);
