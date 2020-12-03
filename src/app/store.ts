import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { createSelectorHook } from 'react-redux';
import slices from './slices';

export const store = configureStore({
  reducer: {
    ...slices,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export const useTypedSelector = createSelectorHook<RootState>();
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
