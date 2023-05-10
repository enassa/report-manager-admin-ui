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

  // MOCKED FUNCTIONALITY
  const recordPayment = async (data) => {
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
        console.log(response, response.data.data);
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

  return {
    recordPayment,
    getTransactionsAsync,
    transactionsList,
    activeReport,
    fetchedAllTransactions,
    setActiveReport,
  };
};
