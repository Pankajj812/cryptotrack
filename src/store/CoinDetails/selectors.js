import { createSelector } from "reselect";

const getPending = (state) => state.coinDetails.pending;
const getCoin = (state) => state.coinDetails.coins;

const getCoinHistoryData = (state) => state.coinDetails.marketData;

const getError = (state) => state.coinDetails.error;

export const coinDetailsSelector = createSelector(getCoin, (coins) => coins);
export const getPendingSelector = createSelector(
  getPending,
  (pending) => pending
);
export const getErrorSelector = createSelector(getError, (error) => error);
export const getCoinHistory = createSelector(
  getCoinHistoryData,
  (marketData) => marketData
);
export const chartFilterSelector = createSelector(
  (state) => state.coinDetails.chartFilter,
  (chartFilter) => chartFilter
);

export const trendingCoinSelector = createSelector(
  (state) => state.coinDetails.trendingCoin,
  (trendingCoin) => trendingCoin
);

export const watchlistSelector = createSelector(
  (state) => state.coinDetails.watchLists,
  (watchLists) => watchLists
);
