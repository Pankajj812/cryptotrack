import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWatchList,
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
  watchlistSelector,
} from "../../store/CoinDetails/selectors";
import { Box } from "@mui/system";
import {Typography } from "@mui/material";
import Loader from "../../components/Loader";
import CoinCard from "../../components/CoinCard";
import { HistoryChart } from "../../components/HistoryChart";
import moment from "moment";
import BaseSelect from "../../components/Select";
import { frequecyOptions, selectOptions } from "../../constants";

function CoinDetails() {
  const dispatch = useDispatch();
  const params = useParams();
  const loading = useSelector(getPendingSelector);
  const coinDetails = useSelector(coinDetailsSelector);
  const error = useSelector(getErrorSelector);
  const coinHistory = useSelector(getCoinHistory);
  const filter = useSelector(chartFilterSelector);
  const watchLists = useSelector(watchlistSelector);

  const { id } = params;

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

  const handleWatchList = (coinDetails) => {
    if (watchLists.length > 0) {
      const found = watchLists?.find((item) => item.id === coinDetails.id);
      if (found) {
        const updatedWatchList = watchLists.filter(
          (item) => item.id !== coinDetails.id
        );
        dispatch(addToWatchList(updatedWatchList));
        return;
      }
    }
    dispatch(addToWatchList([...watchLists, coinDetails]));
  };

  console.log("Watch List", watchLists)
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
      {error && <Typography className="danger">{error}</Typography>}

      <Box style={{ display: "flex" }}>
        <Box display="flex" justifyContent="space-between">
          {!error && coinDetails && Object.keys(coinDetails).length > 0 && (
            <>
              <CoinCard
                coinDetails={coinDetails}
                handleWatchList={() => {
                  handleWatchList(coinDetails);
                }}
                watchLists ={watchLists}
              />
            </>
          )}
        </Box>

        <Box style={{ marginLeft: "2%", marginTop: "1%" }}>
          <Box width={900}>
            {loading && !priceCorrespondentToLabels && <Loader />}
            {labels && priceCorrespondentToLabels && (
              <HistoryChart
                chartData={{ labels, priceCorrespondentToLabels, filter }}
              />
            )}
          </Box>
          <div
            style={{
              marginTop: "2%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
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
        </Box>
      </Box>
    </Box>
  );
}
export default CoinDetails;
