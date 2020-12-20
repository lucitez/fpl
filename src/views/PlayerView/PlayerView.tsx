import { fetchPlayerDetails } from 'app/slices/playersSlice';
import React, { FC, useEffect } from 'react';
import {
  ArrowBackSVGIcon,
  Button,
  Card,
  CircularProgress,
  Text,
} from 'react-md';
import { useDispatch } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useTypedSelector } from '../../app/store';
import classes from './PlayerView.module.scss';
import { ResponsiveLine, Datum, Serie, PointTooltipProps } from '@nivo/line';
import PlayerDetailCard from './PlayerDetialCard';
import TeamTooltip from 'components/TeamTooltip';

const PlayerView: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
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
    teamId: gameWeek.opponent_team,
  }));

  const serie: Serie[] = [
    {
      id: 'total points',
      data,
    },
  ];

  const tooltip = ({ point }: React.PropsWithChildren<PointTooltipProps>) => {
    const teamId = player?.history[point.index]?.opponent_team;
    return <TeamTooltip teamId={teamId} />;
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.headerSection}>
          <Button
            buttonType='icon'
            theme='primary'
            themeType='contained'
            onClick={() => history.replace('/')}
          >
            <ArrowBackSVGIcon color='theme-primary' />
          </Button>
        </div>
        <div className={classes.headerSection}>
          <PlayerDetailCard player={player} />
        </div>
        <div className={classes.headerSection} />
      </div>
      <Card className={classes.graphCard}>
        <Text>Points per gameweek</Text>
        <div className={classes.graphContainer}>
          <ResponsiveLine
            data={serie}
            pointSize={10}
            lineWidth={3}
            enableGridX={false}
            useMesh
            tooltip={tooltip}
            margin={{ top: 50, right: 200, bottom: 50, left: 60 }}
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
            theme={{
              fontSize: 16,
              axis: {
                domain: { line: { strokeWidth: 3, stroke: 'gray' } },
                legend: { text: { fontSize: 16, fontWeight: 'bolder' } },
              },
            }}
          />
        </div>
      </Card>
    </div>
  );
};

export default PlayerView;
