import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { API } from "./../../../App";
import { END_POINTS } from "./../../../constants/urls";
import {
  clearReportsList,
  endReportActivity,
  raiseReportActivity,
  saveReports,
  setDownloadUrl,
  setReportBlob,
  updateReport,
} from "./report-slice";
import { useActivityService } from "../activity-slice/activity-service";
import {
  errorToast,
  successToast,
  warningToast,
} from "../../../components/toast/toastify";
import axios from "axios";
import { BASE_URL } from "../../../constants/ui-data";

export const useReportService = () => {
  const { raiseActivity, endActivity } = useActivityService();
  const reportList = useSelector((state) => state?.reportSlice?.reports);
  const fileBlob = useSelector((state) => state?.reportSlice?.fileBlob);
  const fetchedAllReports = useSelector(
    (state) => state?.reportSlice?.fetchedAllReports
  );
  const loadingReports = useSelector(
    (state) => state?.reportSlice?.loadingReports
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // MOCKED FUNCTIONALITY
  const getReportsAsync = async (data) => {
    dispatch(raiseReportActivity());

    return API.POST(END_POINTS.getReportForStudent, data)
      .then(async (response) => {
        console.log(response.data.data);
        if (response.data.success) {
          dispatch(saveReports(response.data.data));
        }
        successToast("Checked for reports succesfully");
      })
      .catch((error) => {
        errorToast("Could not unlock report. Please contact the school");
      })
      .finally(() => {
        dispatch(endReportActivity());
      });
  };

  const clearReportsAsync = () => {
    dispatch(clearReportsList());
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
    dispatch(raiseReportActivity());
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
        dispatch(endReportActivity());
      });
  };

  const uploadReportAsync = async (formData) => {
    raiseActivity("Uploading reports");
    axios
      .post(BASE_URL + END_POINTS.uploadSingleReport, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data?.failedUploads);
        successToast("Report uploaded successfuly");
        console.log(res);
      })
      .catch((error) => {
        errorToast("Reports upload failed");
        console.log(error);
      })
      .finally(() => {
        endActivity();
      });
  };

  const uploadBulkReportsAsync = async (formData) => {
    raiseActivity("Uploading reports");
    axios
      .post(BASE_URL + "/api/upload-reportss", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data?.failedUploads);
        if (res.data?.data?.failedUploads?.length) {
          warningToast("Some duplicates were skipped");
          return;
        }
        successToast("Reports upload successfuly");
        console.log(res);
      })
      .catch((error) => {
        errorToast("Reports upload failed");
        console.log(error);
      })
      .finally(() => {
        endActivity();
      });
  };

  return {
    getReportsAsync,
    isfileInCache,
    downloadReportAsync,
    reportList,
    fileBlob,
    loadingReports,
    uploadReportAsync,
    fetchedAllReports,
    uploadBulkReportsAsync,
    clearReportsAsync,
  };
};
