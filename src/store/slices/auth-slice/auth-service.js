import { useSelector } from "react-redux";
import { useModal } from "../../../components/modal/modal-context";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  getAsObjectFromLocalStorage,
  removeItemsFromLocalStorage,
  removeItemsFromSessionStorage,
} from "../../../constants/reusable-functions";
import {
  setAuthResponse,
  setSelectedSchool,
  setUpSubscription,
  setUpUser,
} from "./auth-slice";
import { API } from "./../../../App";
import { ROUTES } from "../../../constants/route-links";
import { END_POINTS } from "./../../../constants/urls";
import { BASE_URL, LOCAL_STORAGE_KEYS } from "../../../constants/ui-data";
import { errorToast, successToast } from "../../../components/toast/toastify";

export const useAuthService = () => {
  const userData = useSelector((state) => state?.authSlice?.userData);
  const authResponse = useSelector((state) => state?.authSlice?.authResponse);
  const subscriptions = useSelector((state) => state?.authSlice?.subscriptions);
  const launchedApps = useSelector((state) => state?.authSlice?.launchedApps);
  const selectedSchool = useSelector(
    (state) => state?.authSlice?.selectedSchool
  );
  const registeredSchools = useSelector(
    (state) => state?.authSlice?.registeredSchools
  );

  const { showModal } = useModal();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loadingAuth, setLoading] = useState(false);

  const getActiveSchool = () =>
    getAsObjectFromLocalStorage(LOCAL_STORAGE_KEYS.selectedSchool);
  const userIsLoggedIn = () => {
    const school = getActiveSchool();
    !!school && API.setBaseURL(BASE_URL());

    if (!!userData) return true;
    const localUserData = getAsObjectFromLocalStorage(
      LOCAL_STORAGE_KEYS.userData
    );
    console.log(localUserData);
    !!localUserData &&
      Object.keys(localUserData)?.length &&
      dispatch(setUpUser(localUserData));
    // !!localUserData && API.setToken(localUserData.token);
    return !!localUserData;
  };

  useEffect(() => {
    const school = getActiveSchool();
    !!school && dispatch(setSelectedSchool(school));
  }, []);

  const processLoginSuccess = (user) => {
    dispatch(
      setUpUser({
        ...user,
        // token: response?.data,
      })
    );
    // API.setToken(response.data.token);
    navigate(ROUTES.list.url);
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

  const logOut = (data) => {
    showModal("Do you really want to logout?", (response) => {
      if (response) {
        const clearAction1 = removeItemsFromLocalStorage([
          LOCAL_STORAGE_KEYS.userData,
          LOCAL_STORAGE_KEYS.activeStudent,
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
          processLoginSuccess(response.data.data);
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

  const registerOrganization = async (data, callBack) => {
    setLoading(true);
    return API.POST(END_POINTS.register, data)
      .then(async (response) => {
        if (response.data.success) {
          successToast("Organisation was created succesfully");
        } else {
          errorToast(response.data.message);
        }
      })
      .catch((error) => {
        errorToast(error.message);
        processFailedAuth("unknown", "login");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const setSelectedSchoolAsync = (selected) => {
    API.setBaseURL(selected.url);
    dispatch(setSelectedSchool(selected));
  };
  const setRegisteredSchoolsAsync = (schools) => {
    dispatch(setSelectedSchool(schools));
  };

  return {
    logOut,
    loginAsync,
    registerOrganization,
    userIsLoggedIn,
    loadingAuth,
    selectedSchool,
    registeredSchools,
    authResponse,
    userData,
    launchedApps,
    subscriptions,
    setSelectedSchoolAsync,
    setRegisteredSchoolsAsync,
    resetAuthResponse,
  };
};
