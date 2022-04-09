import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./styles.css";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

const useStyles = makeStyles({
  root: {
    "&.MuiDataGrid-root .MuiDataGrid-cell:focus": {
      outline: "none",
    },
  },
});

export default function CoinTable({ columns, rows }) {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleRowClick = (row) => {
    navigate(`/coin/${row.row?.coinId}`);
  };

  return (
    <Box
      style={{
        height: "100vh",
        width: "100%",
      }}
      sx={{
        "& .super-app.negative": {
          color: "red",
        },
        "& .super-app.positive": {
          color: "green",
        },
        "& .super-app": {
          color: "white",
        },
        "& div.MuiTablePagination-root": {
          color: "white",
        },
      }}
    >
      <DataGrid
        className={classes.root}
        rows={rows}
        columns={columns}
        pageSize={9}
        rowsPerPageOptions={[9]}
        disableColumnSelector
        checkboxSelection={false}
        disableColumnMenu={true}
        onRowClick={(row) => handleRowClick(row)}
        style={{ cursor: "pointer" }}
        // GridLinesVisibility={false}
      />
    </Box>
  );
}
