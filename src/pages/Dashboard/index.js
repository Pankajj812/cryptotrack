import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CoinChart from "../../components/CoinChart";
import WatchList from "../../components/WatchList";
import { fetchAllCoins } from "../../store/AllCoins/actions";
import { getTodosSelector } from "../../store/AllCoins/selectors";
import { fetchTrendingCoins } from "../../store/CoinDetails/actions";
import { chartFilterSelector } from "../../store/CoinDetails/selectors";

import "./styles.css";
function Dashboard() {
  const dispatch = useDispatch();
  // const trendingCoins = useSelector(trendingCoinSelector);
  // const coinHistory = useSelector(getCoinHistory);
  // const loading = useSelector(getPendingSelector);
  const coins = useSelector(getTodosSelector);
  // const error = useSelector(getErrorSelector);
  const filter = useSelector(chartFilterSelector);

  const [label, setLabel] = useState([]);
  const [data, setData] = useState({});

  useEffect(() => {
    dispatch(fetchTrendingCoins({ currency: filter?.currency ?? "usd" }));
    dispatch(fetchAllCoins({ currency: filter?.currency ?? "usd" }));
  }, [filter?.currency]);

  useEffect(() => {
    if (coins?.length > 0) {
      const labels = coins?.map((item) => item?.symbol?.toUpperCase());
      const data = coins?.map((item) => item?.current_price);
      setLabel(labels);
      setData(data);
    }
  }, [coins]);

  //Not working right now
  // useEffect(() => {
  //   if (trendingCoins && trendingCoins.length > 0) {
  //     trendingCoins.forEach((element) => {
  //       dispatch(
  //         fetchCoinHistory({
  //           id: element.id,
  //           currency: "usd",
  //           days: 1,
  //         })
  //       );
  //     });
  //   }
  // }, [trendingCoins]);

  return (
    <>
      <Box
        style={{
          display: "flex",
          width: "100%",
          height: "10%",
          background: "black",
        }}
      >
        <CoinChart label={label} data={data} />
        {/* <MarketApp /> */}
        <CoinChart label={label} data={data} />
      </Box>

      <WatchList />
    </>
  );
}

export default Dashboard;
