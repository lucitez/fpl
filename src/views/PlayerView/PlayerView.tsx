import { fetchPlayerDetails } from 'app/slices/playersSlice';
import React, { FC, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CircularProgress,
} from 'react-md';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { useTypedSelector } from '../../app/store';
import styles from './PlayerView.module.scss';
import { ResponsiveLine, Datum, Serie } from '@nivo/line';

const PlayerView: FC = () => {
  const dispatch = useDispatch();
  const {
    params: { id },
  } = useRouteMatch<{ id: string }>('/players/:id');

  useEffect(() => {
    dispatch(fetchPlayerDetails(id));
  }, [id, dispatch]);

  const status = useTypedSelector((state) => state.dumpSlice.status);
  const player = useTypedSelector((state) => state.playersSlice.byId[id]);
  const isLoading = ['unloaded', 'loading'].includes(status);

  if (isLoading) {
    return <CircularProgress id='player-details-loading' />;
  }

  const data: Datum[] = player?.history.map((gameWeek) => ({
    x: gameWeek.round,
    y: gameWeek.total_points,
  }));

  const serie: Serie[] = [
    {
      id: 'total points',
      data,
    },
  ];

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <ResponsiveLine
          data={serie}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Gameweek',
            legendOffset: 36,
            legendPosition: 'middle',
          }}
          axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Points',
            legendOffset: -40,
            legendPosition: 'middle',
          }}
        />
      </Card>
    </div>
  );
};

export default PlayerView;
