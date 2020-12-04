import PlayerCard from 'components/PlayerCard';
import React, { FC, useEffect } from 'react';
import { CircularProgress, Grid, GridCell, Text } from 'react-md';
import { useDispatch } from 'react-redux';
import { getDump } from '../../app/slices/dumpSlice';
import { useTypedSelector } from '../../app/store';
import { PlayerTable } from '../../components';
import styles from './PlayerView.module.scss';

const PlayerView: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDump());
  }, [dispatch]);

  const status = useTypedSelector((state) => state.dumpSlice.status);
  const isLoading = ['unloaded', 'loading'].includes(status);

  return (
    <div className={styles.playerView}>
      {isLoading ? (
        <CircularProgress id='player-dump-loading' />
      ) : (
        <div>
          <Text type='headline-2' margin='none' color='theme-secondary'>
            Stat Leaders
          </Text>
          <Grid>
            <GridCell className={styles.playerCardContainer} colSpan={3}>
              <PlayerCard title='Total points' field='total_points' />
            </GridCell>
            <GridCell className={styles.playerCardContainer} colSpan={3}>
              <PlayerCard
                title='Goal contributions'
                field='goals_plus_assists'
              />
            </GridCell>
            <GridCell className={styles.playerCardContainer} colSpan={3}>
              <PlayerCard title='Goals' field='goals_scored' />
            </GridCell>
            <GridCell className={styles.playerCardContainer} colSpan={3}>
              <PlayerCard title='Assists' field='assists' />
            </GridCell>
          </Grid>
          <PlayerTable />
        </div>
      )}
    </div>
  );
};

export default PlayerView;
