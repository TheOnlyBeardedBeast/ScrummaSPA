interface IUser {
    connectionId: string;
    vote?: number;
    userName?: string;
    role: number;
}

interface IVoteResult {
    [index: string]: number;
}

interface IHistoryItem {
    title: string;
    vote: number;
}

declare module 'gradstop';
