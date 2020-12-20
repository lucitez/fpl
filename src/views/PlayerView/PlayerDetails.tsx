import { PlayerState } from 'app/slices/playersSlice';
import React, { FC } from 'react';

import { TextRow } from 'components';
import { Positions } from 'app/slices/positionsSlice';
import { useTypedSelector } from 'app/store';
import { orderBy } from 'lodash';
import Ranking from 'components/Ranking';

import classes from './PlayerView.module.scss';

interface Props {
  player: PlayerState;
}

const PlayerDetails: FC<Props> = ({ player }) => {
  const players = useTypedSelector((state) =>
    Object.values(state.playersSlice.byId),
  );

  if (!player) return null;

  const getRank = (field: string) => {
    const sortedPlayers = orderBy(players, field, 'desc');

    let currentValue = sortedPlayers[1][field];
    let currentRank = 1;
    let rank: number;
    let tied = false;

    for (let i = 0; i < sortedPlayers.length; i++) {
      const rankedPlayer = sortedPlayers[i];

      if (rankedPlayer[field] < currentValue) {
        currentRank = i;
        currentValue = rankedPlayer[field];
      }

      if (rankedPlayer.id === player.id) {
        if (
          sortedPlayers[i + 1] &&
          sortedPlayers[i + 1][field] === rankedPlayer[field]
        ) {
          tied = true;
        }

        rank = currentRank;

        break;
      }
    }

    return <Ranking value={player[field]} rank={rank} tied={tied} />;
  };

  return (
    <div className={classes.rankingsContainer}>
      <TextRow field='Total Points' value={getRank('total_points')} />
      {player.element_type === Positions.GOALKEEPER && (
        <>
          <TextRow
            field='Clean Sheets'
            value={player.clean_sheets.toString()}
          />
          <TextRow field='Saves' value={player.saves.toString()} />
          <TextRow
            field='Goals Conceded'
            value={player.goals_conceded.toString()}
          />
          <TextRow
            field='Penalty Saves'
            value={player.penalties_saved.toString()}
          />
        </>
      )}
      {player.element_type === Positions.DEFENDER && (
        <>
          <TextRow
            field='Clean Sheets'
            value={player.clean_sheets.toString()}
          />
        </>
      )}
      {[Positions.DEFENDER, Positions.MIDFIELDER, Positions.FORWARD].includes(
        player.element_type,
      ) && (
        <>
          <TextRow field='Goals' value={getRank('goals_scored')} />
          <TextRow field='Assists' value={getRank('assists')} />
        </>
      )}
    </div>
  );
};

export default PlayerDetails;
