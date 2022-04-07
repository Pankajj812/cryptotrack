export const BASE_URL = "https://api.coingecko.com/api/v3";

export const CoinList = (currency) =>
  `/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

export const SingleCoin = (id) =>
  `/coins/${id}`;

export const HistoricalChart = (id, days = 365, currency) =>
  `/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

export const TrendingCoins = (currency) =>
  `/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=16&page=1&sparkline=false&price_change_percentage=24h`;
