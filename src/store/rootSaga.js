import { all, fork } from "redux-saga/effects";

import coinsSaga from "./AllCoins/sagas";
import coinDetailsSaga from "./CoinDetails/sagas";

export function* rootSaga() {
  yield all([fork(coinsSaga)]);
  yield all([fork(coinDetailsSaga)]);
}
