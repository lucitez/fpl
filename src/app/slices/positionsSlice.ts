import { createSlice } from '@reduxjs/toolkit';
import { Position } from '../../client/typings';
import { getDump } from './dumpSlice';

interface PositionsState {
  byId: Record<string, Position>;
}

const initialState: PositionsState = {
  byId: {},
};

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

export default positionsSlice.reducer;
