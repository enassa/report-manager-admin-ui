import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { API } from "./../../../App";
import { END_POINTS } from "./../../../constants/urls";

export const useReportService = () => {
  const reportList = useSelector((state) => state?.reportSlice?.reports);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loadinReports, setLoading] = useState(false);

  // MOCKED FUNCTIONALITY
  const getReports = async (data) => {
    setLoading(true);
    return API.POST(END_POINTS.getAllReports, data)
      .then(async (response) => {})
      .catch((error) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  const downloadReport = async (data) => {
    setLoading(true);
    return API.POST(END_POINTS.downloadReport, data)
      .then(async (response) => {})
      .catch((error) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    getReports,
    downloadReport,
    reportList,
  };
};
