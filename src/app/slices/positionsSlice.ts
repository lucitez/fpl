import { createSlice } from '@reduxjs/toolkit';
import { Position } from '../../client/typings';
import { getDump } from './dumpSlice';

interface PositionsState {
  byId: Record<string, Position>;
}

const initialState: PositionsState = {
  byId: {},
};

enum Positions {
  GOALKEEPER = 1,
  DEFENDER,
  MIDFIELDER,
  FORWARD,
}

export const positionsSlice = createSlice({
  name: 'positions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getDump.fulfilled,
      (state, { payload: { elementTypes: positions } }) => {
        positions?.forEach((position) => {
          const { id } = position;
          state.byId[id] = position;
        });
      },
    );
  },
});

export { Positions };
export default positionsSlice.reducer;
