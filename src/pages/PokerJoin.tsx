import React, { useState, ChangeEvent, FormEvent } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

import "./join.scss";

interface PokerJoinProps extends RouteComponentProps<any> {}

export const PokerJoinPage: React.FC<PokerJoinProps> = ({ history }) => {
  const [name, setName] = useState<string>("");

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;

    setName(target.value);
  };

  const handleJoin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    history.push("/poker", { name });
  };

  return (
    <div className="join">
      <form onSubmit={handleJoin}>
        <label>Name</label>
        <input type="text" onChange={handleNameChange} value={name} />
        <button type="submit">Join</button>
      </form>
    </div>
  );
};

export const PokerJoin = withRouter(PokerJoinPage);
