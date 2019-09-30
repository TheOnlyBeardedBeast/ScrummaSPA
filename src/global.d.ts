interface IUser {
  connectionId: string;
  vote?: number;
  userName?: string;
  role: number;
}

interface IVoteResult {
  [index: string]: number;
}

declare module 'gradstop';
