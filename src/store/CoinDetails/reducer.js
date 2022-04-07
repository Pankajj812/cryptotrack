import {
  ADD_TO_WATCH_LISTS,
  FETCH_COIN_DETAILS,
  FETCH_COIN_DETAILS_FAILURE,
  FETCH_COIN_DETAILS_SUCCESS,
  FETCH_COIN_HISTORY,
  FETCH_COIN_HISTORY_FAILURE,
  FETCH_COIN_HISTORY_SUCCESS,
  FETCH_TRENDING_COIN,
  FETCH_TRENDING_COINS_FAILURE,
  FETCH_TRENDING_COINS_SUCCESS,
  REMOVE_FROM_WATCH_LISTS,
  SET_CHART_FILTERS,
} from "./actionTypes";

const initialState = {
  pending: false,
  coins: {},
  error: null,
  marketData: {},
  chartFilter: {
    currency: "usd",
    frequency: 365,
  },
  watchLists: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COIN_DETAILS:
      return {
        ...state,
        pending: true,
      };
    case FETCH_COIN_DETAILS_SUCCESS:
      return {
        ...state,
        pending: false,
        coins: action.payload.coinDetails,
        error: null,
      };
    case FETCH_COIN_DETAILS_FAILURE:
      return {
        ...state,
        pending: false,
        coins: {},
        error: action.payload.error,
      };

    case FETCH_COIN_HISTORY:
      return {
        ...state,
        pending: true,
      };
    case FETCH_COIN_HISTORY_SUCCESS:
      return {
        ...state,
        pending: false,
        marketData: action.payload.coinDetails,
        error: null,
      };
    case FETCH_COIN_HISTORY_FAILURE:
      return {
        ...state,
        pending: false,
        marketData: {},
        error: action.payload.error,
      };
    case SET_CHART_FILTERS:
      return {
        ...state,
        pending: false,
        chartFilter: {
          ...state.chartFilter,
          ...action.payload,
        },
        error: action.payload.error,
      };

    //Trending Coins
    case FETCH_TRENDING_COIN:
      return {
        ...state,
        pending: true,
      };
    case FETCH_TRENDING_COINS_SUCCESS:
      return {
        ...state,
        pending: false,
        trendingCoin: action.payload.trendingCoins,
        error: null,
      };
    case FETCH_TRENDING_COINS_FAILURE:
      return {
        ...state,
        pending: false,
        trendingCoin: {},
        error: action.payload.error,
      };
    case ADD_TO_WATCH_LISTS:
      return {
        ...state,
        pending: false,
        watchLists: action.payload,
        error: null,
      };
    default:
      return {
        ...state,
      };
  }
};
