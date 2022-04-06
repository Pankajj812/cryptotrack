import { combineReducers } from "redux";

import coinReducer from "./AllCoins/reducer";
import coinDetailsReducer from "./CoinDetails/reducer";

const rootReducer = combineReducers({
  coins: coinReducer,
  coinDetails: coinDetailsReducer,
});

export default rootReducer;
