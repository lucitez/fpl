import React from 'react';
import { PlayerView, TeamView } from './views';
import { Route, Switch } from 'react-router-dom';
import './App.scss';

function App() {
  return (
    <Switch>
      <Route path='/teams'>
        <TeamView />
      </Route>
      <Route path='/'>
        <PlayerView />
      </Route>
    </Switch>
  );
}

export default App;
