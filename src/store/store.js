import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth-slice/auth-slice";
import reportReducer from "./slices/report-slice/report-slice";

export const store = configureStore({
  reducer: {
    authSlice: authReducer,
    reportSlice: reportReducer,
  },
});
