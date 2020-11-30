import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchDump, FetchDumpResponse } from '../../client';
import { RootState } from '../store';

interface DumpState {
  status: 'unloaded' | 'loading' | 'loaded' | 'error';
}

const initialState: DumpState = {
  status: 'unloaded',
};

const getDump = createAsyncThunk<FetchDumpResponse, void, { state: RootState }>(
  'dump/fetch',
  () => fetchDump(),
  {
    condition: (...[, { getState }]) => {
      const {
        dumpSlice: { status },
      } = getState();
      return status === 'unloaded';
    },
  },
);

const dump = createSlice({
  name: 'dump',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDump.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getDump.fulfilled, (state) => {
      state.status = 'loaded';
    });
    builder.addCase(getDump.rejected, (state) => {
      state.status = 'error';
    });
  },
});

const { reducer } = dump;

export default reducer;
export { getDump };
