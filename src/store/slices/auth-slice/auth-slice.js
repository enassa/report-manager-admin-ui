import { createSlice } from "@reduxjs/toolkit";
import {
  saveObjectInLocalStorage,
  saveObjectInSession,
} from "../../../constants/reusable-functions";
import { LOCAL_STORAGE_KEYS } from "../../../constants/ui-data";
const initialState = {
  userData: undefined,
  authResponse: undefined,
  subscriptions: [],
  launchedApps: [],
};
export const authSlice = createSlice({
  name: "auth_SLICE",
  initialState,
  reducers: {
    setUpUser: (state, { payload }) => {
      saveObjectInLocalStorage(LOCAL_STORAGE_KEYS.userData, payload);
      state.userData = payload;
    },
    setUpSubscription: (state, { payload }) => {
      saveObjectInLocalStorage(LOCAL_STORAGE_KEYS.subscriptions, payload);
      state.subscriptions = payload;
    },
    setAuthResponse: (state, { payload }) => {
      state.authResponse = payload;
    },
    updateSubscriptions: (state, { payload }) => {
      console.log(payload);
      const allSubscriptions = state.subscriptions;
      const indexOfSubscriptions = allSubscriptions.findIndex(
        (subscription) => subscription._id === payload._id
      );
      allSubscriptions.splice(indexOfSubscriptions, 1, payload);
      saveObjectInLocalStorage(
        LOCAL_STORAGE_KEYS.subscriptions,
        allSubscriptions
      );
      saveObjectInSession(LOCAL_STORAGE_KEYS.subscriptions, allSubscriptions);
      state.subscriptions = [...allSubscriptions];
    },
    addToLaunchedApps: (state, { payload }) => {
      if (state.launchedApps.includes(payload)) return;
      state.launchedApps.push(payload);
    },
  },
});
export const {
  setUpUser,
  setAuthResponse,
  updateSubscriptions,
  setUpSubscription,
  addToLaunchedApps,
} = authSlice.actions;
export default authSlice.reducer;
