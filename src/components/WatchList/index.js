import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import "./styles.css";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { trendingCoinSelector } from "../../store/CoinDetails/selectors";
import { fetchTrendingCoins } from "../../store/CoinDetails/actions";
import Carousel from "react-material-ui-carousel";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { getTodosSelector } from "../../store/AllCoins/selectors";
import { fetchAllCoins } from "../../store/AllCoins/actions";
import { useNavigate } from "react-router-dom";

export default function WatchList(props) {
  const trendingCoins = useSelector(trendingCoinSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [coins, setCoins] = React.useState([]);

  // const loading = useSelector(getPendingSelector);
  const allCoins = useSelector(getTodosSelector);
  // const error = useSelector(getErrorSelector);

  const [sortedCoin, setSortedCoin] = React.useState([]);

  useEffect(() => {
    dispatch(fetchTrendingCoins({ currency: "usd" }));
    dispatch(fetchAllCoins());
  }, []);

  console.log(allCoins);

  useEffect(() => {
    if (allCoins?.length > 0) {
      const sorted = allCoins
        .sort(
          (a, b) =>
            b.price_change_percentage_24h - a.price_change_percentage_24h
        )
        .slice(0, 5);
      setSortedCoin(sorted);
    }
  }, [allCoins]);

  React.useEffect(() => {
    if (trendingCoins?.length > 0) {
      const coinArr = [];
      for (let coin = 0; coin <= 3; coin++) {
        coinArr.push(trendingCoins?.splice(0, 4));
      }
      setCoins(coinArr);
    }
  }, [trendingCoins]);

  console.log("sortedCoin", sortedCoin);

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 3,
          width: "46%",
          height: "40vh",
        },
      }}
    >
      <Paper>
        {!props?.chartData && (
          <>
            <Typography className="trending">Top Movers Past 24h</Typography>

            <div>
              {sortedCoin?.map((coin) => (
                <div
                  class="container"
                  onClick={() => {
                    navigate(`/coin/${coin?.id}`);
                  }}
                >
                  <div class="item">
                    <img height={30} width={30} src={coin.image}></img>
                  </div>
                  <div class="item">{coin.name}</div>
                  <div
                    class="item"
                    className={
                      coin?.price_change_percentage_24h > 0
                        ? "priceChangeIncrease"
                        : "priceChangeDecrease"
                    }
                  >
                    {coin?.price_change_percentage_24h > 0 ? (
                      <TrendingUpIcon />
                    ) : (
                      <TrendingDownIcon />
                    )}
                    {coin?.price_change_percentage_24h.toFixed(2)}%
                  </div>
                  <div
                    class="item"
                    className={
                      coin?.price_change_24h > 0
                        ? "priceChangeIncrease"
                        : "priceChangeDecrease"
                    }
                  >
                    {coin?.price_change_24h}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </Paper>
      <Paper>
        <Typography className="trending">Trending Coins</Typography>
        <Carousel
          navButtonsAlwaysInvisible={true}
          height={200}
          indicators={false}
          duration={200}
          animation="slide"
        >
          {coins?.map((item, index) => {
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  marginTop: "5%",
                }}
                key={index}
              >
                {item.map((subitem, i) => {
                  return (
                    <Box
                      style={{ cursor: "pointer" }}
                      key={subitem.id}
                      onClick={() => {
                        navigate(`/coin/${subitem?.id}`);
                      }}
                    >
                      <img height={70} width={70} src={subitem.image}></img>
                      <Typography>{subitem.name}</Typography>
                      <Typography
                        className={
                          subitem?.price_change_percentage_24h > 0
                            ? "priceChangeIncrease"
                            : "priceChangeDecrease"
                        }
                      >
                        {subitem?.price_change_percentage_24h > 0 ? (
                          <TrendingUpIcon />
                        ) : (
                          <TrendingDownIcon />
                        )}
                        {subitem?.price_change_percentage_24h.toFixed(2)}%
                      </Typography>
                    </Box>
                  );
                })}
              </div>
            );
          })}
        </Carousel>
      </Paper>
    </Box>
  );
}
