import React, { FC, useEffect } from 'react';
import { CircularProgress } from 'react-md';
import { useDispatch } from 'react-redux';
import { getDump } from '../../app/slices/dumpSlice';
import { useTypedSelector } from '../../app/store';
import { PlayerTable } from '../../components';
import styles from './HomeView.module.scss';

const HomeView: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDump());
  }, [dispatch]);

  const status = useTypedSelector((state) => state.dumpSlice.status);
  const isLoading = ['unloaded', 'loading'].includes(status);

  return (
    <div className={styles.homeView}>
      {isLoading ? (
        <CircularProgress id='player-dump-loading' />
      ) : (
        <PlayerTable />
      )}
    </div>
  );
};

export default HomeView;
