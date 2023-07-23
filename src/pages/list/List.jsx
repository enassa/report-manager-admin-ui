import React, { useEffect, useState } from "react";
import {
  GRADUATION_YEARS,
  SCHOOL_INFO,
  STUDENT_ACTION_TABS,
  dummyStudents,
  openTrades,
} from "../../constants/ui-data";
import DynamicTable from "./../../components/dynamic-table/DynamicTable";
import {
  AccountBalanceOutlined,
  AccountCircle,
  AccountCircleOutlined,
  Close,
  DeleteOutline,
  FileDownloadOutlined,
  FileUploadOutlined,
  House,
  More,
  Refresh,
  SyncAlt,
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import TSelector from "../../components/input-selector/Selector";
import TButton from "../../components/button/Button";
import { getDurationOfStudies } from "../../constants/reusable-functions";
import { useStudentDataService } from "./../../store/slices/students-slice/student-service";
import AppGrid from "../../components/app-grid/AppGrid";
import StudentDataRowActions from "./StudentDataRowActions";
import StudentInfo from "./StudentInfo";
import ReportUpoader from "./ReportUpoader";
import ReportDownloader from "./ReportDownloader";

export default function List() {
  const defaultClassName = `class_of_${new Date().getFullYear() + 1}`;
  const {
    studentList,
    activeStudentActionTab,
    setActiveStudentActionTabsAsync,
    getAllstudentsAsync,
  } = useStudentDataService();

  const colDef = [
    {
      headerCheckboxSelection: true,
      checkboxSelection: true,
      width: 50,
      pinned: "left",
    },
    {
      field: "Name",
      filter: true,

      cellStyle: { textAlign: "left" },
    },
    { field: "BECE_Index" },
    { field: "Programme" },
    { field: "Class" },
    { field: "Guardians_Contact" },
    { field: "Call_Contact" },
    { field: "Track" },
    { field: "House" },
    { field: "Graduation_Year" },
    { field: "Current_Year" },
    {
      field: "Action",
      pinned: "right",
      width: 200,
      cellRenderer: StudentDataRowActions,
    },
  ];

  useEffect(() => {
    if (!studentList.length) {
      getAllstudentsAsync({
        className: `class_of_2021`,
        ...SCHOOL_INFO,
      });
    }
    // console.log(studentList);
  }, []);

  const ejectGraduationYears = () => {
    return GRADUATION_YEARS.map((year, index) => {
      return <option key={index + "options"}>{"Admitted in " + year}</option>;
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
      ...SCHOOL_INFO,
    });
  };

  const studentActions = [
    { title: STUDENT_ACTION_TABS.profile, icon: <AccountCircle /> },
    { title: STUDENT_ACTION_TABS.uploads, icon: <FileUploadOutlined /> },
    { title: STUDENT_ACTION_TABS.downloads, icon: <FileDownloadOutlined /> },
  ];

  const getActiveStudentActionPage = () => {
    switch (activeStudentActionTab) {
      case STUDENT_ACTION_TABS.profile:
        return <StudentInfo />;
      case STUDENT_ACTION_TABS.uploads:
        return <ReportUpoader />;
      case STUDENT_ACTION_TABS.downloads:
        return <ReportDownloader />;
      default:
        return <StudentInfo />;
    }
  };

  const ejectStudentActions = () => {
    return studentActions.map((item, index) => {
      return (
        <div
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
    <div className="w-full h-full p-2 flex  overflow-hidden">
      <div className="flex w-full h-full flex-col">
        <div className="flex w-full h-[50px] justify-end">
          <div></div>
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
          </TButton>
          <div className="w-[200px]">
            <TSelector
              onChange={(selectedAdmissionDate) => {
                changeClass(selectedAdmissionDate);
              }}
              placeholder="Select graduation type"
              label=""
              name="admission_year"
              className="bg-[#F5F7F9] border-0 flex"
            >
              {ejectGraduationYears()}
            </TSelector>
          </div>
        </div>
        <div className=""></div>
        <AppGrid colDef={colDef} tableData={[...studentList]} />
      </div>
      <div className="w-[300px] h-full flex">
        <div className="w-[300px] h-full ">
          <div className="w-full h-[60px] flex px-2">
            {ejectStudentActions()}
          </div>
          <div className="w-full h-[calc(100%-60px)] max-w-[100%] max-h-[100%] overflow-hidden pl-2">
            {getActiveStudentActionPage()}
          </div>
        </div>
      </div>
    </div>
  );
}
