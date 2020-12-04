import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { filter, orderBy } from 'lodash';
import { RootState } from '../store';

interface PlayerTableState {
  teamId: number;
  positionId: 1 | 2 | 3 | 4;
}

const initialState: PlayerTableState = {
  teamId: null,
  positionId: null,
};

export const playerTableSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    updateSelectedTeam: (state, { payload }: PayloadAction<number>) => {
      state.teamId = payload;
    },
  },
});

const getFilteredPlayers = (
  state: RootState,
  sortColumn: string,
  sortDirection: 'asc' | 'desc',
) => {
  let players = Object.values(state.playersSlice.byId);
  const teamId = state.playerTableSlice.teamId;
  const positionId = state.playerTableSlice.positionId;

  players = filter(players, (player) => {
    return teamId ? player.team === teamId : true;
  });

  players = filter(players, (player) => {
    return positionId ? player.element_type === positionId : true;
  });

  return orderBy(players, sortColumn, sortDirection).slice(0, 50);
};

export const { updateSelectedTeam } = playerTableSlice.actions;
export { getFilteredPlayers };
export default playerTableSlice.reducer;
