import React, { FC } from 'react';
import { useTypedSelector } from 'app/store';
import { Text } from 'react-md';

import classes from './TeamTooltip.module.scss';

interface Props {
  teamId: number;
}

const TeamTooltip: FC<Props> = ({ teamId }) => {
  const team = useTypedSelector((state) => state.teamsSlice.byId[teamId]);

  return (
    <div className={classes.container}>
      <div className={classes.opponentContainer}>
        <Text weight='medium' margin='none' className={classes.opponent}>
          vs.
        </Text>
        <img
          alt='team'
          height={30}
          width={30}
          src={`https://resources.premierleague.com/premierleague/badges/20/t${team.code}@x2.png`}
        />
      </div>
    </div>
  );
};

export default TeamTooltip;
