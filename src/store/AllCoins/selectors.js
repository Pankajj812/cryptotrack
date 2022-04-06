import { createSelector } from "reselect";

const getPending = (state) => state.coins.pending;

const getCoin = (state) => state.coins.coins;

const getError = (state) => state.coins.error;

export const getTodosSelector = createSelector(getCoin, (coins) => coins);

export const getPendingSelector = createSelector(
  getPending,
  (pending) => pending
);

export const getErrorSelector = createSelector(getError, (error) => error);
