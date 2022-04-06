import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCoinDetails,
  fetchCoinHistory,
} from "../../store/CoinDetails/actions";
import { useParams } from "react-router";
import {
  chartFilterSelector,
  coinDetailsSelector,
  getCoinHistory,
  getErrorSelector,
  getPendingSelector,
} from "../../store/CoinDetails/selectors";
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import Loader from "../../components/Loader";
import CoinCard from "../../components/CoinCard";
import { HistoryChart } from "../../components/HistoryChart";
import moment from "moment";
import BaseSelect from "../../components/Select";
import { frequecyOptions, selectOptions } from "../../constants";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function CoinDetails() {
  const dispatch = useDispatch();
  const params = useParams();
  const loading = useSelector(getPendingSelector);
  const coinDetails = useSelector(coinDetailsSelector);
  const error = useSelector(getErrorSelector);
  const coinHistory = useSelector(getCoinHistory);
  const filter = useSelector(chartFilterSelector);

  const { id } = params;

  const buttonTheme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          // Name of the slot
          root: {
            height: "40px",
            marginRight: "5%",
          },
        },
      },
    },
  });

  useEffect(() => {
    dispatch(fetchCoinDetails({ id }));
  }, []);

  useEffect(() => {
    dispatch(
      fetchCoinHistory({
        id,
        currency: filter.currency,
        days: filter.frequency,
      })
    );
  }, [filter]);

  const { prices } = coinHistory;
  const labels = prices?.map((item) =>
    filter.frequency === 1
      ? moment(item[0]).format("hh:mm a")
      : moment.utc(item[0]).format("MMM Do YY")
  );
  const priceCorrespondentToLabels = prices?.map((item) => item[1]);

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
      {!loading &&
        !error &&
        coinDetails &&
        Object.keys(coinDetails).length > 0 && (
          <Box display="flex" justifyContent="space-between">
            <CoinCard coinDetails={coinDetails} />
            <ThemeProvider theme={buttonTheme}>
              <Button
                height={40}
                variant="contained"
                endIcon={<BookmarkBorderIcon />}
              >
                Add to Watchlist
              </Button>
            </ThemeProvider>
          </Box>
        )}

      {labels && priceCorrespondentToLabels && (
        <Box>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <BaseSelect
              classes="base"
              label="Currency"
              options={selectOptions}
              defaultValue="usd"
            />
            <BaseSelect
              classes="base base1"
              label="Frequency"
              options={frequecyOptions}
              defaultValue="365"
            />
          </div>
          <HistoryChart
            chartData={{ labels, priceCorrespondentToLabels, filter }}
          />
        </Box>
      )}
    </Box>
  );
}
export default CoinDetails;
