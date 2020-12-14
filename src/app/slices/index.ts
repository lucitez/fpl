import dumpSlice from './dumpSlice';
import playersSlice, { PlayerState } from './playersSlice';
import playerTableSlice from './playerTableSlice';
import positionsSlice from './positionsSlice';
import teamsSlice from './teamsSlice';

const slices = {
  dumpSlice,
  playersSlice,
  playerTableSlice,
  positionsSlice,
  teamsSlice,
};

export type { PlayerState };
export default slices;
