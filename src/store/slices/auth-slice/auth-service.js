import { useSelector } from "react-redux";
import { useModal } from "../../../components/modal/modal-context";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  getAsObjectFromLocalStorage,
  removeItemsFromLocalStorage,
  removeItemsFromSessionStorage,
} from "../../../constants/reusable-functions";
import { setAuthResponse, setUpSubscription, setUpUser } from "./auth-slice";
import { API } from "./../../../App";
import { ROUTES } from "../../../constants/route-links";
import { END_POINTS } from "./../../../constants/urls";
import { LOCAL_STORAGE_KEYS } from "../../../constants/ui-data";

export const useAuthService = () => {
  const userData = useSelector((state) => state?.authSlice?.userData);
  const authResponse = useSelector((state) => state?.authSlice?.authResponse);
  const subscriptions = useSelector((state) => state?.authSlice?.subscriptions);
  const launchedApps = useSelector((state) => state?.authSlice?.launchedApps);

  const { showModal } = useModal();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loadingAuth, setLoading] = useState(false);

  const userIsLoggedIn = () => {
    if (!!userData) return true;
    const localUserData = getAsObjectFromLocalStorage(
      LOCAL_STORAGE_KEYS.userData
    );
    const subscriptions = getAsObjectFromLocalStorage(
      LOCAL_STORAGE_KEYS.subscriptions
    );
    !!localUserData && dispatch(setUpUser(localUserData));
    !!subscriptions && dispatch(setUpSubscription(subscriptions));
    !!localUserData && API.setToken(localUserData.token);
    return !!localUserData;
  };

  const processLoginSuccess = (response) => {
    dispatch(
      setUpUser({
        ...response.data.userData,
        token: response?.data?.token,
      })
    );
    dispatch(setUpSubscription(response.data.subscriptions));
    API.setToken(response.data.token);

    navigate(ROUTES.reports.url);
  };

  const processFailedAuth = (error, response, page) => {
    setLoading(false);
    if (error === "unknown") {
      dispatch(
        setAuthResponse({
          error: error,
          message: "Uknown error, check your internet connnection",
          ok: false,
          success: false,
          page,
        })
      );
      return;
    }
    dispatch(
      setAuthResponse({
        error: error,
        message: response.data.message,
        ok: false,
        success: false,
        page,
      })
    );
  };

  const registerAsync = async (data) => {
    setLoading(true);
    return API.POST(END_POINTS.register, {
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      password: data.password,
    })
      .then(async (response) => {
        if (response?.data?.success === true) {
          dispatch(
            setAuthResponse({
              message: "Registeration was succesfull",
              ok: true,
              success: true,
              page: "register",
            })
          );
          return;
        } else {
          processFailedAuth("credentials", response.data, "register");
        }
      })
      .catch((error) => {
        processFailedAuth("unknown", error, "register");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const logOut = (data) => {
    showModal("Do you really want to logout?", (response) => {
      if (response) {
        const clearAction1 = removeItemsFromLocalStorage([
          LOCAL_STORAGE_KEYS.userData,
          LOCAL_STORAGE_KEYS.activeReport,
          LOCAL_STORAGE_KEYS.subscriptions,
        ]);

        const clearAction2 = removeItemsFromSessionStorage([
          LOCAL_STORAGE_KEYS.subscriptions,
        ]);
        if (clearAction1 && clearAction2) {
          dispatch(setUpUser(undefined));
          navigate(ROUTES.base.url);
        }
      }
    });
  };

  const resetAuthResponse = () => {
    dispatch(setAuthResponse({}));
  };

  // MOCKED FUNCTIONALITY
  const loginAsync = async (data, callBack) => {
    setLoading(true);
    return API.POST(END_POINTS.login, data)
      .then(async (response) => {
        if (response.data.success) {
          processLoginSuccess(response.data);
          if (callBack) {
            callBack(response.data);
          }
        } else {
          processFailedAuth("credentials", response.data);
        }
      })
      .catch((error) => {
        processFailedAuth("unknown", "login");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    logOut,
    loginAsync,
    registerAsync,
    userIsLoggedIn,
    loadingAuth,
    authResponse,
    userData,
    launchedApps,
    subscriptions,
    resetAuthResponse,
  };
};
