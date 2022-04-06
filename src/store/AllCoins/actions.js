import {
  FETCH_ALL_COINS,
  FETCH_ALL_COINS_FAILURE,
  FETCH_ALL_COINS_SUCCESS,
} from "./actionTypes";

export const fetchAllCoins = () => ({
  type: FETCH_ALL_COINS,
});

export const fetchAllCoinsSuccess = (payload) => ({
  type: FETCH_ALL_COINS_SUCCESS,
  payload,
});

export const fetchAllCoinsFailure = (payload) => ({
  type: FETCH_ALL_COINS_FAILURE,
  payload,
});
