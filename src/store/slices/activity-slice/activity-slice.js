import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  activity: { title: "Loding...", loading: false },
};
export const activitySlice = createSlice({
  name: "activitysd",
  initialState,
  reducers: {
    setActivity: (state, { payload }) => {
      state.activity = payload;
    },
    resetActivity: (state) => {
      state.activity = {
        loading: false,
        title: "Loading...",
      };
    },
  },
});
export const { setActivity, resetActivity } = activitySlice.actions;
export default activitySlice.reducer;
