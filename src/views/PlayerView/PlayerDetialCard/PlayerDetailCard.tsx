import { PlayerState } from 'app/slices/playersSlice';
import React, { FC } from 'react';
import { Card, CardContent, Text } from 'react-md';
import { useTypedSelector } from '../../../app/store';
import classes from './PlayerDetailCard.module.scss';
import PlayerStatRankings from '../PlayerStatRankings';

interface Props {
  player: PlayerState;
}

const PlayerDetailCard: FC<Props> = ({ player }) => {
  const team = useTypedSelector((state) => state.teamsSlice.byId[player?.team]);
  const position = useTypedSelector(
    (state) => state.positionsSlice.byId[player?.element_type],
  );

  if (!player) return null;

  return (
    <Card className={classes.playerCard}>
      <CardContent className={classes.imageContainer}>
        <img
          src={`https://resources.premierleague.com/premierleague/photos/players/110x140/p${player.code}.png`}
          alt='player'
        />
      </CardContent>
      <CardContent
        className={classes.playerDetailsContainer}
        disableExtraPadding
      >
        <div>
          <Text type='headline-4' color='theme-secondary' margin='none'>
            {`${player.first_name} ${player.second_name}`}
          </Text>
          <Text type='headline-6' margin='none'>
            {position.singular_name}
          </Text>
          <Text type='body-1' color='theme-primary' margin='none'>
            {team.name}
          </Text>
          <Text type='subtitle-1' margin='none'>
            {player.selected_by_percent}% ownership
          </Text>
        </div>
        <PlayerStatRankings player={player} />
      </CardContent>
    </Card>
  );
};

export default PlayerDetailCard;
