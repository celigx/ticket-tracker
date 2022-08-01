import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  homeScreen: true,
  editScreen: false,
};

const ticketInputSlice = createSlice({
  name: "ticketTransactionList",
  initialState,
  reducers: {
    homeScreen(state, action) {
      state.homeScreen = action.payload;
    },
    editScreen(state, action) {
      state.editScreen = action.payload;
    },
  },
});

export const ticketInputActions = ticketInputSlice.actions;
export const selectTicketInput = (state) => state.balance;
export default ticketInputSlice.reducer;
