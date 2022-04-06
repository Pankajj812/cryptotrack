import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import "./styles.css";
import { Typography } from "@mui/material";

export default function WatchList(props) {
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
          <Typography className="typo">My WatchLists</Typography>
        )}
      </Paper>
      <Paper>
        {!props?.chartData && (
          <Typography className="typo">Recently Visited</Typography>
        )}
      </Paper>
    </Box>
  );
}
