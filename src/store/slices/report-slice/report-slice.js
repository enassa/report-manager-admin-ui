import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  reports: [],
  fetchedAllReports: false,
};
export const reportSlice = createSlice({
  name: "reportsd",
  initialState,
  reducers: {
    saveReports: (state, { payload }) => {
      state.reports = payload;
      state.fetchedAllReports = true;
    },
    updateReport: (state, { payload }) => {
      console.log(payload);
      const allReports = state.reports;
      const indexOfTransaction = allReports.findIndex(
        (report) => report._id === payload._id
      );
      allReports.splice(indexOfTransaction, 1, payload);
      state.transactions = [...allReports];
    },
  },
});
export const { updateReport, saveReports } = reportSlice.actions;
export default reportSlice.reducer;
