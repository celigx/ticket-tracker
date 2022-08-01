import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objId: "",
  ticketList: [],
};

const ticketTransactionSlice = createSlice({
  name: "ticketTransactionList",
  initialState,
  reducers: {
    addToList(state, action) {
      state.ticketList = [action.payload, ...state.ticketList];
    },
    removeFromList(state, action) {
      state.ticketList = state.ticketList.filter(
        (el) => el !== state.ticketList[action.payload]
      );
    },
    getList(state, action) {
      state.ticketList = action.payload;
    },
    editList(state, action) {
      state.ticketList = action.payload;
    },
    setObjId(state, action) {
      state.objId = action.payload;
    },
  },
});

export const ticketTransactionActions = ticketTransactionSlice.actions;
export const selectTicketTransactionList = (state) =>
  state.ticketTransactionSlice;
export default ticketTransactionSlice.reducer;
