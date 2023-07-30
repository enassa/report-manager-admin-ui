import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  reports: [],
  fetchedAllReports: false,
  fileBlob: null,
  downloadUrl: "",
  loadingReports: false,
};
export const reportSlice = createSlice({
  name: "reportsd",
  initialState,
  reducers: {
    saveReports: (state, { payload }) => {
      state.reports = payload;
      state.fetchedAllReports = true;
      state.fileBlob = "";
    },
    clearReportsList: (state, { payload }) => {
      state.reports = [];
      state.fetchedAllReports = false;
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
    raiseReportActivity: (state) => {
      state.loadingReports = true;
    },
    endReportActivity: (state) => {
      state.loadingReports = false;
    },
  },
});
export const {
  updateReport,
  saveReports,
  clearReportsList,
  setDownloadUrl,
  setReportBlob,
  raiseReportActivity,
  endReportActivity,
  loadingReports,
} = reportSlice.actions;
export default reportSlice.reducer;
