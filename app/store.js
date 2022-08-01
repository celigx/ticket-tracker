import { configureStore } from "@reduxjs/toolkit";
import balanceSlice from "../feature/balance/balanceSlice";
import fundsSlice from "../feature/funds/fundsSlice";
import ticketInputSlice from "../feature/ticketInput/ticketInputSlice";
import ticketTransactionSlice from "../feature/ticketTransactionList/ticketTransactionSlice";

const store = configureStore({
  reducer: {
    balance: balanceSlice,
    funds: fundsSlice,
    ticketTransactionList: ticketTransactionSlice,
    ticketInput: ticketInputSlice,
  },
});

export default store;
