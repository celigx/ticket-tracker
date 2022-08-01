import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  funds: "",
};

const fundsSlice = createSlice({
  name: "funds",
  initialState,
  reducers: {
    addFunds(state, action) {
      state.funds = state.funds + action.payload;
    },
  },
});

export const fundsActions = fundsSlice.actions;
export const selectFunds = (state) => state.funds.funds;
export default fundsSlice.reducer;
