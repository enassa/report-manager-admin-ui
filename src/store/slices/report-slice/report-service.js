import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { API } from "./../../../App";
import { END_POINTS } from "./../../../constants/urls";
import { saveReports, updateReport } from "./report-slice";
import { useActivityService } from "../activity-slice/activity-service";
import { errorToast, successToast } from "../../../components/toast/toastify";

export const useReportService = () => {
  const { raiseActivity, endActivity } = useActivityService();
  const reportList = useSelector((state) => state?.reportSlice?.reports);
  const fetchedAllReports = useSelector(
    (state) => state?.reportSlice?.fetchedAllReports
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loadinReports, setLoading] = useState(false);

  // MOCKED FUNCTIONALITY
  const getReportsAsync = async (data) => {
    setLoading(true);
    raiseActivity("Fetching reports");
    return API.POST(END_POINTS.getAllReports, data)
      .then(async (response) => {
        if (response.data.success) {
          dispatch(saveReports(response.data.data));
          successToast("Checked for reports succesfully");
        }
        console.log(response, response.data.success);
      })
      .catch((error) => {
        errorToast("Could not unlock report. Please contact the school");
      })
      .finally(() => {
        endActivity();
      });
  };

  const downloadReportAsync = async (data, allData) => {
    raiseActivity("Downloading report");
    setLoading(true);
    return API.POST(END_POINTS.downloadReport, data, "blob")
      .then(async (response) => {
        return response.data;
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = data.File_Name;
        link.click();
        window.URL.revokeObjectURL(url);
        let Locked = allData.Locked;
        if (allData.DownloadsLeft === 1) {
          Locked = true;
        }
        dispatch(
          updateReport({
            ...allData,
            DownloadsLeft: allData.DownloadsLeft - 1,
            DownloadCount: allData.DownloadCount + 1,
            Locked,
          })
        );
      })
      .catch((error) => {
        console.error("File download error:", error);
      })
      .finally(() => {
        endActivity();
      });
  };

  return {
    getReportsAsync,
    downloadReportAsync,
    reportList,
    fetchedAllReports,
  };
};