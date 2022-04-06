import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { BASE_URL, CoinList } from "../../api/endpoint";

import { fetchAllCoinsFailure, fetchAllCoinsSuccess } from "./actions";
import { FETCH_ALL_COINS } from "./actionTypes";

const getCoinList = () => axios.get(`${BASE_URL}${CoinList("usd")}`);

/*
  Worker Saga: Fired on FETCH_ALL_COINS action
*/
function* fetchCoinsSaga() {
  try {
    const response = yield call(getCoinList);
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
