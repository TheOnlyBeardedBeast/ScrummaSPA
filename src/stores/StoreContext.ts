import React from 'react';
import { PokerStore } from './PokerStore';

export default React.createContext({ pokerStore: new PokerStore() });
