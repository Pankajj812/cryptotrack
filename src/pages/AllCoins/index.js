import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CoinTable from "../../components/CoinTable";
import Loader from "../../components/Loader";
import { fetchAllCoins } from "../../store/AllCoins/actions";
import {
  getErrorSelector,
  getPendingSelector,
  getTodosSelector,
} from "../../store/AllCoins/selectors";
import "./styles.css";

function AllCoins() {
  const loading = useSelector(getPendingSelector);
  const coins = useSelector(getTodosSelector);
  const error = useSelector(getErrorSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCoins());
  }, []);

  const columns = [
    {
      field: "rank",
      headerName: "Rank",
      width: (window.innerWidth - 100) / 6,
      sortable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "coin",
      headerName: "Coin",
      width: (window.innerWidth - 100) / 6,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => <img height="auto" width={45} src={params.value} />,
    },
    {
      field: "name",
      headerName: "Name",
      width: (window.innerWidth - 100) / 6,
      sortable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "price",
      headerName: "Price ($)",
      width: (window.innerWidth - 100) / 6,
      sortable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "change",
      headerName: "24h Change",
      width: (window.innerWidth - 100) / 6,
      sortable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "marketCap",
      headerName: "Market Cap",
      width: (window.innerWidth - 100) / 6,
      sortable: true,
      align: "center",
      headerAlign: "center",
    },
  ];

  const rows = coins?.map((coin, idx) => {
    return {
      id: idx + 1,
      rank: coin?.market_cap_rank || "N/A",
      coin: coin?.image,
      name: coin?.name,
      change: coin?.price_change_24h,
      price: coin?.current_price,
      marketCap: coin?.market_cap,
      coinId: coin?.id
    };
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 2,
          width: "100%",
          height: "100vh",
        },
      }}
    >
      {loading && <Loader />}
      {error && <Typography className="danger">{error}</Typography>}
      {!loading && !error && <CoinTable columns={columns} rows={rows} />}
    </Box>
  );
}

export default AllCoins;
