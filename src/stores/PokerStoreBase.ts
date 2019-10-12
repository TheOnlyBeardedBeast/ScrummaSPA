import { observable, computed } from 'mobx';
import { HubConnection } from '@aspnet/signalr';

export default class PokerStoreBase {
    @observable protected _connection?: HubConnection = undefined;
    @computed public get connection(): HubConnection | undefined {
        return this._connection;
    }
    public set connection(v: HubConnection | undefined) {
        this._connection = v;
    }

    @observable protected _users: Array<IUser> = [];
    @computed public get users(): Array<IUser> {
        return this._users;
    }
    public set users(v: Array<IUser>) {
        this._users = v;
    }

    @observable protected _self?: IUser = undefined;
    @computed public get self(): IUser | undefined {
        return this._self;
    }
    public set self(v: IUser | undefined) {
        this._self = v;
    }

    @observable protected _seconds: number = 0;
    @computed public get seconds(): number {
        return this._seconds;
    }
    public set seconds(v: number) {
        this._seconds = v;
    }

    @observable protected _timer?: number = undefined;
    @computed public get timer(): number | undefined {
        return this._timer;
    }
    public set timer(v: number | undefined) {
        this._timer = v;
    }

    @observable protected _title: string = '';
    @computed public get title(): string {
        return this._title;
    }
    public set title(v: string) {
        this._title = v;
    }

    @observable protected _history: Array<IHistoryItem> = [];
    @computed public get history(): Array<IHistoryItem> {
        return this._history;
    }
    public set history(v: Array<IHistoryItem>) {
        this._history = v;
    }
}
