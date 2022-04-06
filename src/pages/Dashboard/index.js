import { Box } from "@mui/material";
import React from "react";
import CoinChart from "../../components/CoinChart";
import BaseSelect from "../../components/Select";
import WatchList from "../../components/WatchList";
import "./styles.css";
function Dashboard() {
  return (
    <>
      <CoinChart>
        {/* <BaseSelect /> */}
      </CoinChart>
      <WatchList />
    </>
  );
}

export default Dashboard;
