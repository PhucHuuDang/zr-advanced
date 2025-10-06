import { current } from "@reduxjs/toolkit";

export const logState = (title = "", state: any) => {
  if (title !== "") {
    console.log(`${title}: `, current(state));
  } else {
    console.log(current(state));
  }
};
