import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Player } from '../../client/typings';
import { getDump } from './dumpSlice';

interface PlayerState
  extends Omit<Player, 'influence' | 'creativity' | 'threat' | 'ict_index'> {
  goals_plus_assists: number;
  influence: number;
  creativity: number;
  threat: number;
  ict_index: number;
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
          const { id, influence, creativity, threat, ict_index } = player;

          state.byId[id] = {
            ...player,
            goals_plus_assists: player.goals_scored + player.assists,
            influence: parseFloat(influence),
            creativity: parseFloat(creativity),
            threat: parseFloat(threat),
            ict_index: parseFloat(ict_index),
          };
        });
      },
    );
  },
});

export const { updateSelectedTeam } = playersSlice.actions;
export default playersSlice.reducer;
