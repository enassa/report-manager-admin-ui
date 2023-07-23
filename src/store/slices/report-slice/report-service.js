import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { API } from "./../../../App";
import { END_POINTS } from "./../../../constants/urls";
import {
  saveReports,
  setDownloadUrl,
  setReportBlob,
  updateReport,
} from "./report-slice";
import { useActivityService } from "../activity-slice/activity-service";
import { errorToast, successToast } from "../../../components/toast/toastify";

export const useReportService = () => {
  const { raiseActivity, endActivity } = useActivityService();
  const reportList = useSelector((state) => state?.reportSlice?.reports);
  const fileBlob = useSelector((state) => state?.reportSlice?.fileBlob);
  const fetchedAllReports = useSelector(
    (state) => state?.reportSlice?.fetchedAllReports
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loadingReports, setLoading] = useState(false);

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
      })
      .catch((error) => {
        errorToast("Could not unlock report. Please contact the school");
      })
      .finally(() => {
        endActivity();
      });
  };
  const isfileInCache = (fileName) => {
    if (fileName === undefined) return false;
    return fileBlob?.fileName === fileName;
  };
  const downloadReportAsync = async (data, allData) => {
    if (isfileInCache(data.File_Name)) {
      const url = window.URL.createObjectURL(fileBlob.blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = data.File_Name;
      link.click();
      window.URL.revokeObjectURL(url);
      return;
    }

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
        dispatch(setDownloadUrl(url));
        dispatch(setReportBlob({ blob, fileName: data.File_Name }));
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

  const uploadReportsAsync = async (data) => {
    setLoading(true);
    return API.POST(END_POINTS.uploadSingleReport, data)
      .then(async (response) => {
        if (response.data.success) {
          dispatch(saveReports(response.data.data));
          successToast("Checked for reports succesfully");
        }
      })
      .catch((error) => {
        errorToast("Could not unlock report. Please contact the school");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    getReportsAsync,
    isfileInCache,
    downloadReportAsync,
    reportList,
    fileBlob,
    loadingReports,
    uploadReportsAsync,
    fetchedAllReports,
  };
};
