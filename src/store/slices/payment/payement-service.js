import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { API } from "./../../../App";
import { END_POINTS } from "./../../../constants/urls";
import { saveReports, updateReport } from "../report-slice/report-slice";
import {
  addTransactions,
  addOneTransaction,
  setPayingReport,
} from "./payment-slice";
import { useActivityService } from "../activity-slice/activity-service";
import { errorToast, successToast } from "./../../../components/toast/toastify";
import { ROUTES } from "../../../constants/route-links";
import {
  addToLaunchedApps,
  updateSubscriptions,
} from "../auth-slice/auth-slice";
import {
  saveObjectInLocalStorage,
  saveObjectInSession,
} from "../../../constants/reusable-functions";

export const usePaymentService = () => {
  const { raiseActivity, endActivity } = useActivityService();

  const transactionsList = useSelector(
    (state) => state?.paymentSlice?.transactions
  );
  const fetchedAllTransactions = useSelector(
    (state) => state?.paymentSlice?.fetchedAllTransactions
  );
  const activeReport = useSelector(
    (state) => state?.paymentSlice?.activeReport
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loadinReports, setLoading] = useState(false);
  const setActiveReport = (report) => {
    dispatch(setPayingReport(report));
  };

  const recordReportPayment = async (data) => {
    raiseActivity("Unlocking report...");
    setLoading(true);
    return API.POST(END_POINTS.recordTransation, data)
      .then(async (response) => {
        if (response.data.success) {
          dispatch(addOneTransaction(response.data.data.transaction));
          dispatch(updateReport(response.data.data.report));
          successToast("Report unlocked succesfully");
        }
      })
      .catch((error) => {
        errorToast("Could not unlock report. Please contact the school");
      })
      .finally(() => {
        endActivity();
        setLoading(false);
      });
  };

  const recordReportSubscription = async (data) => {
    raiseActivity("Completing suscription");
    setLoading(true);
    return API.POST(END_POINTS.recordSubscription, data)
      .then((response) => {
        if (response.data.success) {
          dispatch(addOneTransaction(response.data.data.transactions));
          dispatch(
            updateSubscriptions({
              ...response.data.data.subscriptions,
            })
          );
          navigate(ROUTES.reports.url);
          // successToast("Subscription completed");
        }
      })
      .catch((error) => {
        errorToast(
          "Could not complete subscription request. Please contact the school"
        );
      })
      .finally(() => {
        endActivity();
        setLoading(false);
      });
  };

  const getTransactionsAsync = async (data) => {
    raiseActivity("Fetching transaction history...");
    setLoading(true);
    API.setToken("pk_test_bc733043a2fa14aaab884ca767c9100508df31f8");
    return API.POST(END_POINTS.getTransactions, data)
      .then(async (response) => {
        if (response.data.success) {
          dispatch(addTransactions(response.data.data));
          successToast("Checked for transaction history succesfully");
        }
      })
      .catch((error) => {
        errorToast(
          "Could not fetch transaction history, Please report to school"
        );
      })
      .finally(() => {
        endActivity();
        setLoading(false);
      });
  };

  const launchService = async (subscriptionData, serviceUrl) => {
    raiseActivity("Launching application");
    setLoading(true);
    return API.POST(END_POINTS.launchService, subscriptionData)
      .then(async (response) => {
        console.log(response.data.success);
        if (response.data.success) {
          dispatch(
            updateSubscriptions({
              ...response.data.data.subscriptions,
            })
          );
          dispatch(addToLaunchedApps(subscriptionData.ServiceName));
          navigate(serviceUrl);
          console.log(subscriptionData.ServiceName);
        }
      })
      .catch((error) => {
        errorToast("Could not launch application");
      })
      .finally(() => {
        endActivity();
        setLoading(false);
      });
  };

  const raiseComplaint = async (data) => {
    raiseActivity("Submiting your complaint");
    return API.POST(END_POINTS.raisComplaint, data)
      .then(async (response) => {
        if (response.data.success) {
          successToast("Your complaint has been submitted");
        }
        return true;
      })
      .catch((error) => {
        errorToast("Could not submit your complaint");
        return false;
      })
      .finally(() => {
        endActivity();
        setLoading(false);
      });
  };

  return {
    recordReportPayment,
    recordReportSubscription,
    getTransactionsAsync,
    launchService,
    raiseComplaint,
    transactionsList,
    activeReport,
    fetchedAllTransactions,
    setActiveReport,
  };
};
