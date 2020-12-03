import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Player } from '../../client/typings';
import { getDump } from './dumpSlice';

interface PlayerState extends Player {
  goals_plus_assists: number;
}

interface PlayersState {
  byId: Record<string, PlayerState>;
  selectedTeam: string;
}

const initialState: PlayersState = {
  byId: {},
  selectedTeam: null,
};

export const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    updateSelectedTeam(state, action: PayloadAction<string>) {
      state.selectedTeam = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getDump.fulfilled,
      (state, { payload: { elements: players } }) => {
        players.forEach((player) => {
          const { id } = player;

          state.byId[id] = {
            ...player,
            goals_plus_assists: player.goals_scored + player.assists,
          };
        });
      },
    );
  },
});

export const { updateSelectedTeam } = playersSlice.actions;
export default playersSlice.reducer;
