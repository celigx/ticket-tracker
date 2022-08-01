import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {
    addToBalance(state, action) {
      state.value = state.value + action.payload;
    },
    removeFromBalance(state, action) {
      state.value = state.value - action.payload;
    },
    editBalance(state, action) {
      state.value = action.payload;
    },
  },
});

export const balanceActions = balanceSlice.actions;
export const selectBalance = (state) => state.balance.value;
export default balanceSlice.reducer;
