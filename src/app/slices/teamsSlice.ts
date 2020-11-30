import { createSlice } from '@reduxjs/toolkit';
import { Team } from '../../client/typings';
import { getDump } from './dumpSlice';

interface TeamsState {
  byId: Record<string, Team>;
}

const initialState: TeamsState = {
  byId: {},
};

export const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDump.fulfilled, (state, { payload: { teams } }) => {
      teams.forEach((team) => {
        const { id } = team;
        state.byId[id] = team;
      });
    });
  },
});

export default teamsSlice.reducer;
