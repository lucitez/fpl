import { PlayerState } from 'app/slices/playersSlice';
import React, { FC } from 'react';

import { TextRow } from 'components';
import { Positions } from 'app/slices/positionsSlice';

interface Props {
  player: PlayerState;
}

const PlayerDetails: FC<Props> = ({ player }) => {
  if (!player) return null;

  return (
    <div>
      <TextRow field='Total Points' value={player.total_points} />
      {player.element_type === Positions.GOALKEEPER && (
        <>
          <TextRow field='Clean Sheets' value={player.clean_sheets} />
          <TextRow field='Saves' value={player.saves} />
          <TextRow field='Goals Conceded' value={player.goals_conceded} />
          <TextRow field='Penalty Saves' value={player.penalties_saved} />
        </>
      )}
      {player.element_type === Positions.DEFENDER && (
        <>
          <TextRow field='Clean Sheets' value={player.clean_sheets} />
        </>
      )}
      {[Positions.DEFENDER, Positions.MIDFIELDER, Positions.FORWARD].includes(
        player.element_type,
      ) && (
        <>
          <TextRow field='Goals' value={player.goals_scored} />
          <TextRow field='Assists' value={`${player.assists}`} />
        </>
      )}
    </div>
  );
};

export default PlayerDetails;
