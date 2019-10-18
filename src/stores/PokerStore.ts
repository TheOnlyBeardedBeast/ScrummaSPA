import { action, reaction } from 'mobx';
import debounce from 'lodash.debounce';
import { HubConnectionBuilder } from '@aspnet/signalr';
import { toast } from 'react-toastify';

import { PokerStoreComputed } from './PokerStoreComputed';

export class PokerStore extends PokerStoreComputed {
    @action public initializeConnection = async (
        name: string,
        role: number,
        group: number,
        onError: Function,
    ) => {
        this.connection = new HubConnectionBuilder()
            .withUrl('http://localhost:5000/pokerhub')
            .build();

        try {
            await this.connection.start();
        } catch (error) {
            return onError();
        }

        if (!this.isConnected) {
            return onError();
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
                if (!this.seconds && !!seconds) {
                    this.startTimer(seconds);
                }

                this.users = [...this.users, user];
            },
        );

        this.connection.on('clientTimerStart', () => {
            !this.timer && this.startTimer(0);
        });

        this.connection.on('clientTimerStop', () => {
            this.timer && this.stopTimer();
        });

        this.connection.on(
            'clientVoted',
            (connectionId: string, num: number) => {
                const users = this.users.map(user => {
                    if (user.connectionId !== connectionId) {
                        return user;
                    }
                    return { ...user, vote: num };
                });

                this.users = users.sort((a, b) =>
                    a.connectionId.localeCompare(b.connectionId),
                );
            },
        );

        this.connection.on('clearVotes', () => {
            const clensedUsers = this.users.map(user => ({
                ...user,
                vote: undefined,
            }));
            this.self = { ...this.self!, vote: undefined };
            this.users = clensedUsers;
        });

        this.connection.on(
            'syncTitle',
            (title: string) => (this.title = title),
        );

        this.connection.on('addToHistory', (historyItem: IHistoryItem) => {
            this.history.push(historyItem);
            this.title = '';

            this.clearVotes();
        });

        this.connection.on('syncHistoryRequest', (connectionId: string) => {
            if (this.isConnected) {
                this.connection!.send(
                    'OnSyncHistoryResponse',
                    connectionId,
                    this.history,
                    this.title,
                );
            }
        });

        this.connection.on(
            'syncHistoryResponse',
            (history: Array<IHistoryItem>, title: string) => {
                if (history.length > 0) {
                    this.history = history;
                }
                if (title) {
                    this.title = title;
                }
            },
        );
    };

    @action timerTick = () => (this.seconds = this.seconds + 1);

    @action public startTimer = (initialSeconds: number = 0) => {
        if (!initialSeconds) {
            this.clearVotes();
        }

        this.seconds = initialSeconds;
        this.timer = window.setInterval(this.timerTick, 1000);
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
            if (!this.title) {
                return toast.error('Please fill in the input first');
            }

            if (!this.voters.length) {
                return toast.error('No voters to start voting');
            }

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

        if (this.isConnected) {
            this.connection!.send('OnVote', num);
        }
    };

    protected syncTitle = debounce(() => {
        if (this.isConnected) {
            this.connection!.send('OnSyncTitle', this.title);
        }
    }, 250);

    @action setTitle = (title: string) => {
        this.title = title;

        this.syncTitle();
    };

    @action addToHistory = (historyItem: IHistoryItem) => {
        if (this.isConnected) {
            this.connection!.invoke('OnAddToHistory', historyItem);
        }
    };

    protected voteReaction = reaction(
        () =>
            (this.self && this.self.role === 0
                ? [this.self, ...this.users.filter(({ role }) => role === 0)]
                : this.users
            ).map(({ vote }) => vote),
        (votes: Array<number | undefined>) => {
            if (this.timer && votes.every(vote => !!vote)) this.stopTimer();
        },
    );

    protected usersReaction = reaction(
        () => this.users.map(user => user.connectionId),
        (ids: Array<string>) => {
            if (
                ids.length === 1 &&
                this.self &&
                this.isConnected &&
                this.history.length === 0
            ) {
                this.connection!.send('OnSyncHistoryRequest', ids[0]);
            }
        },
    );
}
