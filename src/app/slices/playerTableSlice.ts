import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { filter, orderBy } from 'lodash';
import { SortOrder } from 'react-md';
import { RootState } from '../store';

interface PlayerTableState {
  teamId: number;
  positionId: 1 | 2 | 3 | 4;
  sortColumn: string;
  sortDirection: 'asc' | 'desc';
}

const initialState: PlayerTableState = {
  teamId: null,
  positionId: null,
  sortColumn: 'total_points',
  sortDirection: 'desc',
};

export const playerTableSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    updateSelectedTeam: (state, { payload }: PayloadAction<number>) => {
      state.teamId = payload;
    },
    updateSortColumn: (state, { payload }: PayloadAction<string>) => {
      if (state.sortColumn === payload) {
        state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
      }
      state.sortColumn = payload;
    },
  },
});

const getFilteredPlayers = (state: RootState) => {
  let players = Object.values(state.playersSlice.byId);
  const teamId = state.playerTableSlice.teamId;
  const positionId = state.playerTableSlice.positionId;

  players = filter(players, (player) => {
    return teamId ? player.team === teamId : true;
  });

  players = filter(players, (player) => {
    return positionId ? player.element_type === positionId : true;
  });

  return orderBy(
    players,
    state.playerTableSlice.sortColumn,
    state.playerTableSlice.sortDirection,
  ).slice(0, 50);
};

const getSortData = ({
  playerTableSlice: { sortColumn, sortDirection },
}: RootState): {
  column: string;
  direction: SortOrder;
} => {
  const mdSortDirections: { [order: string]: SortOrder } = {
    asc: 'ascending',
    desc: 'descending',
  };

  return {
    column: sortColumn,
    direction: mdSortDirections[sortDirection],
  };
};

export const {
  updateSelectedTeam,
  updateSortColumn,
} = playerTableSlice.actions;
export { getFilteredPlayers, getSortData };
export default playerTableSlice.reducer;
