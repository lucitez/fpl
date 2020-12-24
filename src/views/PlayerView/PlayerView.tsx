import { fetchPlayerDetails } from 'app/slices/playersSlice';
import React, { FC, useEffect } from 'react';
import { ArrowBackSVGIcon, Button, CircularProgress } from 'react-md';
import { useDispatch } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useTypedSelector } from '../../app/store';
import PlayerDetailCard from './PlayerDetialCard';
import PlayerStatGraph from './PlayerStatGraph';

import classes from './PlayerView.module.scss';

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
      <PlayerStatGraph playerId={id} />
    </div>
  );
};

export default PlayerView;
