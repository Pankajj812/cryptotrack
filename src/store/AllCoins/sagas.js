import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { BASE_URL, CoinList } from "../../api/endpoint";

import { fetchAllCoinsFailure, fetchAllCoinsSuccess } from "./actions";
import { FETCH_ALL_COINS } from "./actionTypes";

const getCoinList = (currency) => axios.get(`${BASE_URL}${CoinList(currency)}`);

/*
  Worker Saga: Fired on FETCH_ALL_COINS action
*/
function* fetchCoinsSaga(payload) {
  const { currency } = payload?.payload ?? {};
  try {
    const response = yield call(getCoinList, currency ?? "usd");
    yield put(
      fetchAllCoinsSuccess({
        coins: response.data,
      })
    );
  } catch (e) {
    yield put(
      fetchAllCoinsFailure({
        error: e.message,
      })
    );
  }
}

/*
  Starts worker saga on latest dispatched `FETCH_ALL_COINS` action.
  Allows concurrent increments.
*/
function* coinsSaga() {
  yield all([takeLatest(FETCH_ALL_COINS, fetchCoinsSaga)]);
}

export default coinsSaga;
