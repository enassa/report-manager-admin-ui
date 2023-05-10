import React, { useEffect } from "react";
import ReportCard from "../../components/report-card/ReportCard";
import { useReportService } from "../../store/slices/report-slice/report-service";
import { useAuthService } from "../../store/slices/auth-slice/auth-service";
import { schoolInfo } from "../../constants/ui-data";
import { useActivityService } from "./../../store/slices/activity-slice/activity-service";
import OverlayLoader from "../../components/overlay_loader/OverlayLoader";
import { svgs } from "../../assets/svg/svg";

export default function Reports() {
  const { reportList, getReportsAsync, fetchedAllReports } = useReportService();
  const { userData } = useAuthService();
  const { activity, raiseActivity } = useActivityService();
  // console.log(userData);
  useEffect(() => {
    !!userData &&
      !fetchedAllReports &&
      getReportsAsync({
        Unique_Id: userData?.Unique_Id,
        className: `class_of_${userData?.Graduation_Year}`,
        ...schoolInfo,
      });
  }, []);

  const ejectReportCards = () => {
    return (
      Array.isArray(reportList) &&
      reportList.map((report, index) => {
        return (
          <ReportCard
            handleDownloadClick={() => {}}
            data={{
              year: report.FormNumber,
              semester: report.Semester,
              downloadsLeft: report.DownloadsLeft,
              locked: report.Locked,
              count: index + 1,
              downloadsCount: report.DownloadCount,
            }}
            allData={report}
            key={index}
          />
        );
      })
    );
  };
  return (
    <div className="h-full w-full flex justify-start md:px-[20px] px-[7px] pt-3 flex-col pb-[100px]">
      {reportList?.length ? (
        ejectReportCards()
      ) : (
        <div className="flex justify-center items-center w-full h-full flex-col">
          <div className="w-[200px] h-[200px]">{svgs.NoReport}</div>
          <div>Your reports will soon be here!</div>
        </div>
      )}
      <div className="h-[30px] min-h-[30px]"></div>
    </div>
  );
}
