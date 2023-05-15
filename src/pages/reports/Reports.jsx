import React, { useEffect, useState } from "react";
import ReportCard from "../../components/report-card/ReportCard";
import { useReportService } from "../../store/slices/report-slice/report-service";
import { useAuthService } from "../../store/slices/auth-slice/auth-service";
import { SCHOOL_INFO, verifyServiceAccess } from "../../constants/ui-data";
import { useActivityService } from "./../../store/slices/activity-slice/activity-service";
import { svgs } from "../../assets/svg/svg";
import { SERVICE_CODES } from "./../../constants/ui-data";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../../constants/route-links";
import { PDFViewer } from "../../components/pdf-viewer/PDFViewer";
import { data } from "autoprefixer";

export default function Reports() {
  const { userData } = useAuthService();
  const [showPDf, setShowPDF] = useState(null);
  const subscribed = !!verifyServiceAccess(SERVICE_CODES.reportService)
    ? true
    : false;
  const {
    reportList,
    fileBlob,
    getReportsAsync,
    fetchedAllReports,
    downloadReportAsync,
  } = useReportService();

  const getFileUrl = () => {
    try {
      return window.URL.createObjectURL(fileBlob.blob);
    } catch {
      return "";
    }
  };
  useEffect(() => {
    !!userData &&
      !fetchedAllReports &&
      subscribed &&
      getReportsAsync({
        Unique_Id: userData?.Unique_Id,
        className: `class_of_${userData?.Graduation_Year}`,
        ...SCHOOL_INFO,
      });
  }, []);

  const ejectReportCards = () => {
    return (
      Array.isArray(reportList) &&
      reportList.map((report, index) => {
        return (
          <ReportCard
            handleOpenFileClick={(data) => {
              setShowPDF(data);
            }}
            data={{
              year: report.FormNumber,
              semester: report.Semester,
              downloadsLeft: report.DownloadsLeft,
              locked: report.Locked,
              count: index + 1,
              downloadsCount: report.DownloadCount,
              File_Name: report.File_Name,
            }}
            allData={report}
            key={index}
          />
        );
      })
    );
  };
  return subscribed ? (
    <div className="h-full w-full anime-rise flex justify-start md:px-[20px] px-[7px] pt-3 flex-col pb-[100px]">
      {reportList?.length ? (
        ejectReportCards()
      ) : (
        <div className="flex justify-center items-center w-full h-full flex-col">
          <div className="w-[200px] h-[200px]">{svgs.NoReport}</div>
          <div>Your reports will soon be here!</div>
        </div>
      )}
      <div className="h-[30px] min-h-[30px]"></div>
      {showPDf && fileBlob && (
        <PDFViewer
          handleClose={() => setShowPDF(false)}
          handleDownload={() =>
            downloadReportAsync({ File_Name: showPDf.File_Name })
          }
          fileUrl={getFileUrl()}
        />
      )}
    </div>
  ) : (
    <Navigate to={ROUTES.apps.url} />
  );
}
