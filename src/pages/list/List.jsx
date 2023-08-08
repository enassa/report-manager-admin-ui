import React, { useEffect } from "react";
import { GRADUATION_YEARS, STUDENT_ACTION_TABS } from "../../constants/ui-data";
import {
  AccountCircle,
  FileDownloadOutlined,
  FileUploadOutlined,
  HourglassBottom,
} from "@mui/icons-material";
import TSelector from "../../components/input-selector/Selector";
import { getDurationOfStudies } from "../../constants/reusable-functions";
import { useStudentDataService } from "./../../store/slices/students-slice/student-service";
import AppGrid from "../../components/app-grid/AppGrid";
import StudentDataRowActions from "./StudentDataRowActions.jsx";
import StudentInfo from "./StudentInfo";
import ReportUpoader from "./ReportUpoader";
import ReportDownloader from "./ReportDownloader";
import SlimLoader from "../../components/slim-loader/SlimLoader";
import NoOption from "./NoOption";
import NoStudentData from "./NoStudentData";
import { useReportService } from "../../store/slices/report-slice/report-service";
import Loader from "../../components/loader/Loader";
import { useAuthService } from "../../store/slices/auth-slice/auth-service";

export default function List() {
  const {
    studentList,
    fetchStudentList,
    activeStudent,
    activeStudentActionTab,
    setActiveStudentActionTabsAsync,
    getAllstudentsAsync,
  } = useStudentDataService();
  const { loadingReports } = useReportService();
  const { userData } = useAuthService();
  const colDef = [
    // {
    //   headerCheckboxSelection: true,
    //   checkboxSelection: true,
    //   width: 50,
    //   pinned: "left",
    // },
    { field: "Programme", enableRowGroup: true },
    { field: "Class", enableRowGroup: true },
    {
      field: "Name",
      filter: true,

      cellStyle: { textAlign: "left" },
    },
    { field: "BECE_Index" },
    { field: "Unique_Id" },
    { field: "Track", enableRowGroup: true },
    { field: "House" },
    { field: "Guardians_Contact" },
    { field: "Call_Contact" },
    { field: "Graduation_Year" },
    { field: "Current_Year" },
    {
      field: "Action",
      pinned: "right",
      width: 50,
      cellRenderer: StudentDataRowActions,
    },
  ];

  const ejectGraduationYears = () => {
    return GRADUATION_YEARS.map((year, index) => {
      return <option key={index + "options"}>{"Enrolled in " + year}</option>;
    });
  };

  const changeClass = (admissionYear) => {
    const enrollmentYear = parseInt(admissionYear.split(" ")[2]);
    const className = `class_of_${
      enrollmentYear + getDurationOfStudies(enrollmentYear)
    }`;

    getAllstudentsAsync({
      className: className,
      enrollmentYear: enrollmentYear,
      ...userData,
    });
  };

  const studentActions = [
    { title: STUDENT_ACTION_TABS.profile, icon: <AccountCircle /> },
    { title: STUDENT_ACTION_TABS.uploads, icon: <FileUploadOutlined /> },
    { title: STUDENT_ACTION_TABS.downloads, icon: <FileDownloadOutlined /> },
  ];

  const getActiveStudentActionPage = () => {
    if (!!activeStudent === false) return <NoOption />;
    switch (activeStudentActionTab) {
      case STUDENT_ACTION_TABS.profile:
        return <StudentInfo />;
      case STUDENT_ACTION_TABS.uploads:
        return <ReportUpoader />;
      case STUDENT_ACTION_TABS.downloads:
        return <ReportDownloader />;
      default:
        return <NoOption />;
    }
  };

  const ejectStudentActions = () => {
    return studentActions.map((item, index) => {
      return (
        <div
          key={index}
          onClick={() => {
            setActiveStudentActionTabsAsync(item.title);
          }}
          className={`h-full w-full flex items-center justify-center flex-col border-b-2 cursor-pointer ${
            activeStudentActionTab === item.title ? "border-violet-500" : ""
          } `}
        >
          <div className="h-full w-full flex justify-center items-center ">
            {item.icon}
          </div>
          <span className="w-full flex justify-center">{item.title}</span>
        </div>
      );
    });
  };

  return (
    <div className="w-full h-full flex flex-col  overflow-hidden">
      <div className="w-full h-full p-2 flex  overflow-hidden">
        <div className="flex w-full h-full flex-col">
          <div className="flex w-full h-[50px] justify-end">
            {/* <div></div>
            <TButton className="max-w-[150px] max-h-[40px] mr-[10px]">
              Delete Class
            </TButton>
            <TButton className="max-w-[150px] max-h-[40px] mr-[10px]">
              Clear Data
            </TButton>
            <TButton className="max-w-[150px] max-h-[40px] mr-[10px]">
              Upload Reports
            </TButton>
            <TButton className="max-w-[150px] max-h-[40px] mr-[10px]">
              Upload Data
            </TButton> */}
            <div className="w-[200px]">
              <TSelector
                onChange={(selectedAdmissionDate) => {
                  changeClass(selectedAdmissionDate);
                }}
                placeholder="Select Enrollment Year"
                label=""
                name="admission_year"
                className="bg-[#F5F7F9] border-0 flex"
              >
                {ejectGraduationYears()}
              </TSelector>
            </div>
          </div>
          <div className=""></div>
          {fetchStudentList ? (
            <AppGrid colDef={colDef} tableData={[...studentList]} />
          ) : (
            <NoStudentData />
          )}
        </div>
        <div className="w-[300px] h-full flex">
          <div className="w-[300px] h-full ">
            <div className="w-full h-[60px] flex px-2">
              {ejectStudentActions()}
            </div>
            <div className="w-full h-[calc(100%-60px)] max-w-[100%] max-h-[100%]  pl-2 relative">
              {/* <SlimLoader /> */}
              {loadingReports ? <SlimLoader /> : null}
              {/* {activeStudent?.Unique_Id ? (
                <div className=" text-grey-500 flex flex-col w-full text-bold shadow-md bg-white border-blue-500 border-2 text-blue-700 rounded-lg left-[-150px] top-[300px] rotate-[-90deg] bottom absolute">
                  <span className=" text-grey-500  w-full text-bold  ">
                    Report Id:{" "}
                    <b className="text-bold"> {activeStudent?.Unique_Id}</b>
                  </span>
                </div>
              ) : null} */}
              {loadingReports ? (
                <div className="w-full h-full flex justify-center items-center">
                  <Loader
                    loaderColor="rgb(55,79,99)"
                    loaderIcon={
                      <HourglassBottom style={{ color: "rgb(55,79,99)" }} />
                    }
                  />
                </div>
              ) : null}
              {getActiveStudentActionPage()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
