import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { filter, orderBy, startsWith } from 'lodash';
import { RootState } from '../store';

interface PlayerTableState {
  teamId: number;
  positionId: number;
}

const initialState: PlayerTableState = {
  teamId: null,
  positionId: null,
};

export const playerTableSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    updateSelectedTeam: (
      state,
      { payload: teamIdString }: PayloadAction<string>,
    ) => {
      const teamId = parseInt(teamIdString, 10);
      if (isNaN(teamId)) {
        state.teamId = null;
      } else {
        state.teamId = teamId;
      }
    },
    updateSelectedPosition: (
      state,
      { payload: positionIdString }: PayloadAction<string>,
    ) => {
      const positionId = parseInt(positionIdString, 10);
      if (isNaN(positionId)) {
        state.positionId = null;
      } else {
        state.positionId = positionId;
      }
    },
  },
});

const getFilteredPlayers = (
  state: RootState,
  sortColumn: string,
  sortDirection: 'asc' | 'desc',
  search: string,
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

  players = filter(players, (player) => {
    if (!search) return true;
    return (
      startsWith(player.first_name.toLowerCase(), search.toLowerCase()) ||
      startsWith(player.second_name.toLowerCase(), search.toLowerCase())
    );
  });

  return orderBy(players, sortColumn, sortDirection).slice(0, 50);
};

export const {
  updateSelectedTeam,
  updateSelectedPosition,
} = playerTableSlice.actions;
export { getFilteredPlayers };
export default playerTableSlice.reducer;
