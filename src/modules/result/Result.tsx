import React from 'react';
import gradstop from 'gradstop';
import { Doughnut } from 'react-chartjs-2';
import { observer, inject } from 'mobx-react';

import { PokerStore } from 'stores/PokerStore';
import './result.scss';

interface ResultProps {
    pokerStore?: PokerStore;
}

const baseColorArray: string[] = ['#ff6b95', '#ffc796'];

export const Result: React.FC<ResultProps> = inject('pokerStore')(
    observer(({ pokerStore }) => {
        const { users, self, timer } = pokerStore!;
        const selfVoted = self && (!!self.vote || self.vote === 0);
        const usersVoted =
            users.length && users.every(user => !!user.vote || user.vote === 0);

        if (timer || (!selfVoted && !usersVoted)) {
            return null;
        }

        const votes: IVoteResult = (self ? [...users, self] : users)
            .filter(user => !!user.vote || user.vote === 0)
            .reduce<IVoteResult>((acc, user) => {
                const voteCount: number | undefined =
                    acc[user.vote!.toString()];

                return {
                    ...acc,
                    [user.vote!.toString()]: voteCount ? voteCount + 1 : 1,
                };
            }, {});

        const data = (canvas: any) => {
            var gradient = (stops: number) =>
                gradstop({
                    stops: stops,
                    inputFormat: 'hex',
                    colorArray: baseColorArray,
                });

            return {
                datasets: [
                    {
                        data: Object.values(votes),
                        backgroundColor:
                            Object.values(votes).length < baseColorArray.length
                                ? baseColorArray.slice(
                                      0,
                                      Object.values(votes).length,
                                  )
                                : gradient(Object.values(votes).length),
                    },
                ],
                labels: Object.keys(votes).map(vote =>
                    vote === '1000' ? '?' : vote,
                ),
            };
        };

        return (
            <div className="result">
                <span className="title">Result</span>
                <Doughnut data={data} />
            </div>
        );
    }),
);
