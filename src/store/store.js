import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth-slice/auth-slice";
import reportReducer from "./slices/report-slice/report-slice";
import paymentReducer from "./slices/payment/payment-slice";
import activityReducer from "./slices/activity-slice/activity-slice";
import StudentsDataReducer from "./slices/students-slice/student-slice";

export const store = configureStore({
  reducer: {
    authSlice: authReducer,
    reportSlice: reportReducer,
    paymentSlice: paymentReducer,

    activitySlice: activityReducer,
    StudentsDataSlice: StudentsDataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
