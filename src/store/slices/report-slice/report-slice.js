import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  reports: [],
  fetchedAllReports: false,
  fileBlob: null,
  downloadUrl: "",
};
export const reportSlice = createSlice({
  name: "reportsd",
  initialState,
  reducers: {
    saveReports: (state, { payload }) => {
      state.reports = payload;
      state.fetchedAllReports = true;
    },
    setReportBlob: (state, { payload }) => {
      state.fileBlob = payload;
    },
    setDownloadUrl: (state, { payload }) => {
      state.downloadUrl = payload;
    },
    updateReport: (state, { payload }) => {
      const allReports = state.reports;
      const indexOfTransaction = allReports.findIndex(
        (report) => report._id === payload._id
      );
      allReports.splice(indexOfTransaction, 1, payload);
      state.transactions = [...allReports];
    },
  },
});
export const { updateReport, saveReports, setDownloadUrl, setReportBlob } =
  reportSlice.actions;
export default reportSlice.reducer;
