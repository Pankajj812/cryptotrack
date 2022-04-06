import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import "./styles.css";
import { Typography } from "@mui/material";

export default function CoinChart(props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 2,
          width: "100%",
          height: "70vh",
        },
      }}
    >
      <Paper>
        {props.children}
        {!props?.chartData && <Typography className="typo">Chart</Typography>}
      </Paper>
    </Box>
  );
}
