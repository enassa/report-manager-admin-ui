import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  reports: undefined,
};
export const reportSlice = createSlice({
  name: "reportsd",
  initialState,
  reducers: {
    saveReports: (state, { payload }) => {
      state.userData = payload;
    },
  },
});
export const { setUpUser } = reportSlice.actions;
export default reportSlice.reducer;
