import {
  FETCH_ALL_COINS,
  FETCH_ALL_COINS_FAILURE,
  FETCH_ALL_COINS_SUCCESS,
} from "./actionTypes";

const initialState = {
  pending: false,
  coins: [],
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_COINS:
      return {
        ...state,
        pending: true,
      };
    case FETCH_ALL_COINS_SUCCESS:
      return {
        ...state,
        pending: false,
        coins: action.payload.coins,
        error: null,
      };
    case FETCH_ALL_COINS_FAILURE:
      return {
        ...state,
        pending: false,
        coins: [],
        error: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
};
