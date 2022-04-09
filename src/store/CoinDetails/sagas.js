import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  BASE_URL,
  HistoricalChart,
  SingleCoin,
  TrendingCoins,
} from "../../api/endpoint";

import {
  fetchCoinDetailsFailure,
  fetchCoinDetailsSuccess,
  fetchCoinHistoryFailure,
  fetchCoinHistorySuccess,
  fetchTrendingCoinsFailure,
  fetchTrendingCoinsSuccess,
} from "./actions";
import {
  FETCH_COIN_DETAILS,
  FETCH_COIN_HISTORY,
  FETCH_TRENDING_COIN,
} from "./actionTypes";

const getCoinList = async (id) => axios.get(`${BASE_URL}${SingleCoin(id)}`);
const getCoinHistory = (id, days, currency) =>
  axios.get(`${BASE_URL}${HistoricalChart(id, days, currency)}`);
const getTrendingCoins = (currency) =>
  axios.get(`${BASE_URL}${TrendingCoins(currency)}`);

/*
  Worker Saga: Fired on FETCH_COIN_DETAILS action
*/
function* fetchCoinDetails({ payload }) {
  try {
    const response = yield call(getCoinList, payload?.id, null, null);
    yield put(
      fetchCoinDetailsSuccess({
        coinDetails: response.data,
      })
    );
  } catch (e) {
    yield put(
      fetchCoinDetailsFailure({
        error: e.message,
      })
    );
  }
}

function* fetchCoinHistory({ payload }) {
  try {
    const response = yield call(
      getCoinHistory,
      payload?.id,
      payload?.days,
      payload?.currency
    );
    yield put(
      fetchCoinHistorySuccess({
        coinDetails: response.data,
      })
    );
  } catch (e) {
    yield put(
      fetchCoinHistoryFailure({
        error: e.message,
      })
    );
  }
}

function* fetchTrendingCoins({ payload }) {
  try {
    const response = yield call(getTrendingCoins, payload?.currency);
    yield put(
      fetchTrendingCoinsSuccess({
        trendingCoins: response.data,
      })
    );
  } catch (e) {
    yield put(
      fetchTrendingCoinsFailure({
        error: e.message,
      })
    );
  }
}
/*
  Starts worker saga on latest dispatched `FETCH_COIN_DETAILS` action.
  Allows concurrent increments.
*/
function* fetchCoinDetailsSaga() {
  yield all([
    takeLatest(FETCH_COIN_DETAILS, fetchCoinDetails),
    takeLatest(FETCH_COIN_HISTORY, fetchCoinHistory),
    takeLatest(FETCH_TRENDING_COIN, fetchTrendingCoins),
  ]);
}

export default fetchCoinDetailsSaga;
