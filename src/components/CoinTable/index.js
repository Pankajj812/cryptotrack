import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./styles.css";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

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
    <div
      style={{
        height: "100vh",
        width: "100%",
      }}
    >
      <DataGrid
        className={classes.root}
        rows={rows}
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[8]}
        disableColumnSelector
        checkboxSelection={false}
        disableColumnMenu={true}
        onRowClick={(row) => handleRowClick(row)}
      />
    </div>
  );
}
