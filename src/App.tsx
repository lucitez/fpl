import React, { useEffect } from 'react';
import { HomeView, PlayerView, TeamView } from './views';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import { useDispatch } from 'react-redux';
import { getDump } from 'app/slices/dumpSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDump());
  }, [dispatch]);

  return (
    <Switch>
      <Route path='/teams'>
        <TeamView />
      </Route>
      <Route path='/players/:id'>
        <PlayerView />
      </Route>
      <Route path='/'>
        <HomeView />
      </Route>
    </Switch>
  );
}

export default App;
