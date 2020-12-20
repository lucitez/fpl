import clsx from 'clsx';
import React, { FC } from 'react';
import { Text } from 'react-md';
import classes from './Ranking.module.scss';

interface Props {
  value: string;
  rank: number;
  tied: boolean;
}

const Ranking: FC<Props> = ({ value, rank, tied = false }) => {
  const parsedRank = (() => {
    if (rank >= 10 && rank <= 20) return `${rank}th`;
    if (rank % 10 === 1) return `${rank}st`;
    if (rank % 10 === 2) return `${rank}nd`;
    if (rank % 10 === 3) return `${rank}rd`;
    return `${rank}th`;
  })();

  const colorClass = (() => {
    if (rank <= 10) return classes.elite;
    if (rank <= 50) return classes.average;
    if (rank <= 100) return classes.poor;
  })();

  return (
    <div className={classes.container}>
      <Text weight='bold' margin='none'>
        {value}
      </Text>
      <div className={clsx(classes.rankContainer, colorClass)}>
        <Text margin='none' type='body-2'>{`${
          tied ? 'T-' : ''
        }${parsedRank}`}</Text>
      </div>
    </div>
  );
};

export default Ranking;
