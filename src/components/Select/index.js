import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { setChartFilters } from "../../store/CoinDetails/actions";
import { chartFilterSelector } from "../../store/CoinDetails/selectors";

export default function BaseSelect(props) {
  const { label, options, classes } = props;
  const dispatch = useDispatch();
  const filter = useSelector(chartFilterSelector);
  const handleChange = (event) => {
    dispatch(
      setChartFilters({
        [event.target.name]: event.target.value,
      })
    );
  };
  return (
    <Box className={classes ? "base" : "baseSelect"}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filter?.[label.toLowerCase()]}
          name={label.toLowerCase()}
          label={label}
          onChange={handleChange}
        >
          {options?.map((opt) => (
            <MenuItem key={opt.id} value={opt.value}>
              {opt.text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
