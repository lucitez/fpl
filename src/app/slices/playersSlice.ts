import { createSlice } from '@reduxjs/toolkit';
import { Player } from '../../client/typings';
import { getDump } from './dumpSlice';

interface PlayersState {
  byId: Record<string, Player>;
}

const initialState: PlayersState = {
  byId: {},
};

export const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getDump.fulfilled,
      (state, { payload: { elements: players } }) => {
        players.forEach((player) => {
          const { id, goals_scored } = player;

          if (goals_scored > 5) {
            state.byId[id] = player;
          }
        });
      },
    );
  },
});

export default teamsSlice.reducer;
