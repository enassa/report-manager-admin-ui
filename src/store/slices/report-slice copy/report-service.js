import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { API } from "../../../App";
import { END_POINTS } from "../../../constants/urls";
import { saveReports, updateReport } from "./report-slice";

export const useReportService = () => {
  const reportList = useSelector((state) => state?.reportSlice?.reports);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loadinReports, setLoading] = useState(false);

  // MOCKED FUNCTIONALITY
  const getReportsAsync = async (data) => {
    setLoading(true);
    return API.POST(END_POINTS.getAllReports, data)
      .then(async (response) => {
        if (response.data.success) {
          dispatch(saveReports(response.data.data));
        }
        console.log(response, response.data.success);
      })
      .catch((error) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const downloadReportAsync = async (data, allData) => {
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
        setLoading(false);
      });
  };

  return {
    getReportsAsync,
    downloadReportAsync,
    reportList,
  };
};
