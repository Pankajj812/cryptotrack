import {
  FETCH_COIN_DETAILS,
  FETCH_COIN_DETAILS_FAILURE,
  FETCH_COIN_DETAILS_SUCCESS,
  FETCH_COIN_HISTORY,
  FETCH_COIN_HISTORY_FAILURE,
  FETCH_COIN_HISTORY_SUCCESS,
  SET_CHART_FILTERS,
} from "./actionTypes";

export const fetchCoinDetails = (payload) => ({
  type: FETCH_COIN_DETAILS,
  payload
});

export const fetchCoinDetailsSuccess = (payload) => ({
  type: FETCH_COIN_DETAILS_SUCCESS,
  payload,
});

export const fetchCoinDetailsFailure = (payload) => ({
  type: FETCH_COIN_DETAILS_FAILURE,
  payload,
});

export const fetchCoinHistory = (payload) => ({
  type: FETCH_COIN_HISTORY,
  payload
});

export const fetchCoinHistorySuccess = (payload) => ({
  type: FETCH_COIN_HISTORY_SUCCESS,
  payload,
});

export const fetchCoinHistoryFailure = (payload) => ({
  type: FETCH_COIN_HISTORY_FAILURE,
  payload,
});

export const setChartFilters = (payload) => ({
  type: SET_CHART_FILTERS,
  payload,
});