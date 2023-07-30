import React, { useEffect, useState } from "react";
import ReportCard from "../../components/report-card/ReportCard";
import { useReportService } from "../../store/slices/report-slice/report-service";
import { useAuthService } from "../../store/slices/auth-slice/auth-service";
import { svgs } from "../../assets/svg/svg";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../../constants/route-links";
import { PDFViewer } from "../../components/pdf-viewer/PDFViewer";
import { useStudentDataService } from "../../store/slices/students-slice/student-service";
import { FileDownloadOutlined } from "@mui/icons-material";

export default function ReportDownloader() {
  const { activeStudent } = useStudentDataService();
  const { userData } = useAuthService();
  const [showPDf, setShowPDF] = useState(null);
  const subscribed = true;
  const {
    reportList,
    fileBlob,
    getReportsAsync,
    fetchedAllReports,
    downloadReportAsync,
    clearReportsAsync,
    loadingReports,
  } = useReportService();

  const getFileUrl = () => {
    try {
      return window.URL.createObjectURL(fileBlob.blob);
    } catch {
      return "";
    }
  };

  useEffect(() => {
    fetchedAllReports && clearReportsAsync();
  }, [activeStudent?.Unique_Id]);

  const loadReports = () => {
    if (loadingReports) return;
    getReportsAsync({
      Unique_Id: activeStudent?.Unique_Id,
      className: `class_of_${activeStudent?.Graduation_Year}`,
      ...userData,
    });
  };

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
      {reportList?.length ? ejectReportCards() : null}
      {fetchedAllReports && !reportList.length ? (
        <div className="flex justify-center items-center w-full h-full flex-col animate-rise">
          <div className="w-[200px] h-[200px]">{svgs.NoReport}</div>
          <div className="flex ">
            No report uploaded for{" "}
            <span className="capitalize text-blue-500 ml-1">
              {activeStudent.First_Name}
            </span>
          </div>
        </div>
      ) : null}
      {!fetchedAllReports ? (
        <div className="flex justify-center items-center w-full h-full flex-col animate-rise">
          {/* <div className="w-[200px] h-[200px]">{svgs.NoReport}</div> */}
          <button
            disabled={loadingReports}
            onClick={() => loadReports()}
            className="min-w-[100px] min-h-[100px] cursor-pointer shadow-md border-2 hover:bg-blue-300 border-white text-white bg-blue-600 flex justify-center items-center rounded-full"
          >
            <FileDownloadOutlined style={{ fontSize: 50 }} />
          </button>
          <div> Click to load report for student</div>
        </div>
      ) : null}
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
