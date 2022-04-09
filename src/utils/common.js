import { number } from "prop-types";

export function formatNumbers(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function roundOff(number, decimal = 2) {
  if (typeof number === "string") {
    number = Number(number);
  }
  return number.toFixed(decimal);
}
