import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  transactions: [],
  activeReport: {},
  fetchedAllTransactions: false,
};
export const PaymentSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransactions: (state, { payload }) => {
      state.fetchedAllTransactions = true;
      state.transactions = [...state.transactions, ...payload];
    },
    addOneTransaction: (state, { payload }) => {
      const data = payload;
      state.transactions.unshift({ ...payload, new: true });
    },
    setPayingReport: (state, { payload }) => {
      state.activeReport = payload;
    },
    updateTransaction: (state, { payload }) => {
      const allTransactions = state.transactions;
      const indexOfTransaction = allTransactions.findIndex(
        (transaction) => transaction.PaymentRef !== payload.PaymentRef
      );
      allTransactions.splice(indexOfTransaction, 1, payload);
      state.transactions = allTransactions;
    },
  },
});
export const {
  addTransactions,
  addOneTransaction,
  updateTransaction,
  setPayingReport,
} = PaymentSlice.actions;
export default PaymentSlice.reducer;
