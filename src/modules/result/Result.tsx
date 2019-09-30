import React from 'react';
import gradstop from 'gradstop';
import { Doughnut } from 'react-chartjs-2';
import './result.scss';

interface ResultProps {
  users: Array<IUser>;
  self?: IUser;
}

const baseColorArray: string[] = ['#ff6b95', '#ffc796'];

export const Result: React.FC<ResultProps> = ({ users, self }) => {
  const votes: IVoteResult = (self ? [...users, self] : users)
    .filter(user => !!user.vote || user.vote === 0)
    .reduce<IVoteResult>((acc, user) => {
      const voteCount: number | undefined = acc[user.vote!.toString()];

      console.log(voteCount);
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
              ? baseColorArray.slice(0, Object.values(votes).length)
              : gradient(Object.values(votes).length),
        },
      ],
      labels: Object.keys(votes),
    };
  };

  return (
    // <Graph className={'ct-octave'} data={data} type="Pie" options={options} />
    <Doughnut data={data} />
  );
};
