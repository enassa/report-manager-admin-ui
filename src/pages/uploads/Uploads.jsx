import React, { useState } from "react";
import TButton from "../../components/button/Button";
import TSelector from "../../components/input-selector/Selector";
import {
  BULK_UPLOAD_OPTIONS,
  GRADUATION_YEARS,
  PROGRAMMES,
  SEMESTERS,
} from "../../constants/ui-data";
import {
  formatSemester,
  formatYearToClassGroup,
} from "../../constants/reusable-functions";
import BulkReportsUpload from "./BulkReportsUpload";
import { AssessmentOutlined, AssignmentIndOutlined } from "@mui/icons-material";
import BulkDataUpload from "./BulkDataUpload";
import SlimLoader from "../../components/slim-loader/SlimLoader";
import axios from "axios";
import { useReportService } from "../../store/slices/report-slice/report-service";
import { useStudentDataService } from "../../store/slices/students-slice/student-service";
import { useAuthService } from "../../store/slices/auth-slice/auth-service";

export default function Uploads() {
  const { uploadBulkReportsAsync } = useReportService();
  const { uploadBulkStudentDataAsync } = useStudentDataService();
  const { userData } = useAuthService();
  const ejectGraduationYears = () => {
    return GRADUATION_YEARS.map((year, index) => {
      return <option key={index + "options"}>{"Enrolled in " + year}</option>;
    });
  };
  const ejectSemesters = () => {
    return SEMESTERS.map((semester, index) => {
      return <option key={index + "options"}>{"Semester " + semester}</option>;
    });
  };
  const ejectProgrammes = () => {
    return PROGRAMMES.map((programme, index) => {
      return (
        <option className="text-left" key={index + "options"}>
          {programme}
        </option>
      );
    });
  };

  const uploadPageTabs = [
    {
      title: BULK_UPLOAD_OPTIONS.excelData,
      icon: <AssignmentIndOutlined />,
    },
    {
      title: BULK_UPLOAD_OPTIONS.reportCards,
      icon: <AssessmentOutlined />,
    },
  ];

  const [activeUploadOption, setActiveTabs] = useState(
    BULK_UPLOAD_OPTIONS.excelData
  );

  const ejectUploadOptions = () => {
    return uploadPageTabs.map((item, index) => {
      return (
        <div
          key={index}
          onClick={() => {
            setActiveTabs(item.title);
          }}
          className={`h-full w-full flex items-center justify-center flex-row border-b-2 cursor-pointer mr-3 ${
            activeUploadOption === item.title ? "border-violet-500" : ""
          } `}
        >
          <div
            className={`h-full w-full flex justify-center items-center  ${
              activeUploadOption === item.title ? "text-violet-500" : ""
            }  `}
          >
            {item.icon}
          </div>
          <span
            className={`w-full flex justify-center whitespace-nowrap  ${
              activeUploadOption === item.title ? "text-violet-500" : ""
            }  `}
          >
            {item.title}
          </span>
        </div>
      );
    });
  };
  const [metadData, setMetaData] = useState({
    year: null,
    semester: null,
    programme: null,
  });
  const validateInput = () => {
    const errorArr = [];
    if (metadData.year === null) {
      errorArr.push("Year");
    }
    if (
      activeUploadOption === BULK_UPLOAD_OPTIONS.reportCards &&
      metadData.semester === null
    ) {
      errorArr.push("Semester");
    }
    if (
      activeUploadOption === BULK_UPLOAD_OPTIONS.excelData &&
      metadData.programme === null
    ) {
      errorArr.push("Programme");
    }

    if (errorArr.length) {
      setErrors({ state: true, errors: errorArr });
      return false;
    } else {
      setErrors({ state: false, errors: [] });
      return true;
    }
  };

  const handleReportUpload = (reportFiles) => {
    if (validateInput()) {
      // alert("");
      // alert('hello')
      // return;
      var formData = new FormData();

      formData.append(
        "extraInfo",
        JSON.stringify({
          className: formatYearToClassGroup(metadData.year),
          ...userData,
          semester: formatSemester(metadData.semester),
          formNumber: 2,
        })
      );
      for (let i = 0; i < reportFiles.length; i++) {
        formData.append("files", reportFiles[i]);
      }

      uploadBulkReportsAsync(formData);
      // formData.append("file", this.state.reportCards);
    }
  };

  const handleExcelDataUpload = (excelFile) => {
    if (validateInput()) {
      var formData = new FormData();
      console.log("=======", userData);
      formData.append(
        "extraInfo",
        JSON.stringify({
          className: formatYearToClassGroup(metadData.year),
          ...userData,
          programme: metadData.programme,
          formNumber: 2,
        })
      );
      formData.append("file", excelFile);
      uploadBulkStudentDataAsync(formData);
    }
  };

  const getActiveUploadAction = () => {
    switch (activeUploadOption) {
      case BULK_UPLOAD_OPTIONS.reportCards:
        return (
          <BulkReportsUpload
            handleReportUpload={(reportFiles) => {
              handleReportUpload(reportFiles);
            }}
          />
        );
      case BULK_UPLOAD_OPTIONS.excelData:
        return (
          <BulkDataUpload
            handleUploadClick={(excelFile) => {
              handleExcelDataUpload(excelFile);
            }}
          />
        );
      default:
        return (
          <BulkDataUpload
            handleUploadClick={(excelFile) => {
              handleExcelDataUpload(excelFile);
            }}
          />
        );
    }
  };
  const [errors, setErrors] = useState({ state: false, errors: [] });

  return (
    <div className="flex w-full h-full flex-col">
      <div className="flex w-full h-[50px] justify-between p-2">
        <div className="flex items-center ">{ejectUploadOptions()}</div>
        <div className="max-w-[900px] w-auto flex">
          {errors.state && (
            <div className="text-red-400 whitespace-nowrap animate-rise mt-2 flex mr-2 h-full items-center">
              {errors.errors.join(",")} not selected.
            </div>
          )}
          <TSelector
            onChange={(yearSelected) => {
              setMetaData({ ...metadData, year: yearSelected });
            }}
            placeholder="Select Admission Year"
            label=""
            name="year"
            value={metadData.year}
            className="bg-[#F5F7F9] border-0 flex min-w-[170px]"
            outerClassName={"mr-4 "}
          >
            {ejectGraduationYears()}
          </TSelector>
          {activeUploadOption === BULK_UPLOAD_OPTIONS.reportCards ? (
            <>
              <TSelector
                onChange={(semesterSelected) => {
                  setMetaData({ ...metadData, semester: semesterSelected });
                  setErrors({ state: false, errors: [] });
                }}
                placeholder="Select Semester"
                label=""
                name="semester"
                className="bg-[#F5F7F9] border-0 flex min-w-[170px]"
                value={metadData.semester}
              >
                {ejectSemesters()}
              </TSelector>
            </>
          ) : (
            <TSelector
              onChange={(programmeSelected) => {
                setMetaData({ ...metadData, programme: programmeSelected });
                setErrors({ state: false, errors: [] });
              }}
              placeholder="Select Programme"
              label=""
              name="programme"
              className="bg-[#F5F7F9] border-0 flex"
              value={metadData.programme}
            >
              {ejectProgrammes()}
            </TSelector>
          )}
        </div>
      </div>
      <div className="w-full h-[calc(100%-50px)]">
        {getActiveUploadAction()}
      </div>
    </div>
  );
}
