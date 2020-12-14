import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { getPlayerDetails, PlayerDetailsResponse } from 'client';
import { Player, PlayerHistory } from '../../client/typings';
import { getDump } from './dumpSlice';

interface PlayerState
  extends Omit<Player, 'influence' | 'creativity' | 'threat' | 'ict_index'> {
  goals_plus_assists: number;
  influence: number;
  creativity: number;
  threat: number;
  ict_index: number;
  history: PlayerHistory[];
  detailsStatus: 'unloaded' | 'loading' | 'loaded';
}

interface PlayersState {
  byId: Record<string, PlayerState>;
  selectedTeam: string;
}

const initialState: PlayersState = {
  byId: {},
  selectedTeam: null,
};

const baseState: Pick<PlayerState, 'history' | 'detailsStatus'> = {
  history: [],
  detailsStatus: 'unloaded',
};

const fetchPlayerDetails = createAsyncThunk<
  PlayerDetailsResponse,
  string,
  { state: RootState }
>('player/details', (id: string) => getPlayerDetails(id), {
  condition: (id, { getState }) => {
    const {
      playersSlice: { byId },
    } = getState();

    if (byId[id]) {
      return byId[id].detailsStatus === 'unloaded';
    }

    return true;
  },
});

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
            ...baseState,
            ...state.byId[id],
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
    builder.addCase(
      fetchPlayerDetails.pending,
      (state, { meta: { arg: playerId } }) => {
        state.byId[playerId] = {
          ...state.byId[playerId],
          detailsStatus: 'loading',
        };
      },
    );
    builder.addCase(
      fetchPlayerDetails.fulfilled,
      (state, { payload: { history }, meta: { arg: playerId } }) => {
        state.byId[playerId] = {
          ...state.byId[playerId],
          history,
          detailsStatus: 'loading',
        };
      },
    );
  },
});

export type { PlayerState };
export const { updateSelectedTeam } = playersSlice.actions;
export { fetchPlayerDetails };
export default playersSlice.reducer;
