import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userData: undefined,
  authResponse: undefined,
};
export const authSlice = createSlice({
  name: "auth_SLICE",
  initialState,
  reducers: {
    setUpUser: (state, { payload }) => {
      state.userData = payload;
    },
    setAuthResponse: (state, { payload }) => {
      state.authResponse = payload;
    },
  },
});
export const { setUpUser, setAuthResponse } = authSlice.actions;
export default authSlice.reducer;
