import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth-slice/auth-slice";

export const store = configureStore({
  reducer: {
    authSlice: authReducer,
  },
});
