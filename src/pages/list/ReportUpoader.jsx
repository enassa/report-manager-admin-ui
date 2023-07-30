import React, { useState } from "react";
import TSelector from "../../components/input-selector/Selector";
import { REPORT_META_INFO } from "../../constants/ui-data";
import TButton from "../../components/button/Button";
import TFormValidator from "../../components/form-validator/FormValidator";
import { useReportService } from "../../store/slices/report-slice/report-service";
import { useStudentDataService } from "../../store/slices/students-slice/student-service";
import { FileUploadOutlined } from "@mui/icons-material";
import TSimpleFileUplaoder from "../../components/simple-file-uploader/simple-file-uplaoder";
import {
  formatFormToNumber,
  formatSemester,
} from "../../constants/reusable-functions";
import { useAuthService } from "../../store/slices/auth-slice/auth-service";

export default function ReportUpoader() {
  const { uploadReportAsync, loadingReports } = useReportService();
  const { userData } = useAuthService();
  const { activeStudent } = useStudentDataService();
  const validationSchema = {
    reportFile: {
      required: true,
    },
    age: {
      required: true,
    },
    w3review: {
      required: true,
    },
    year: {
      required: true,
    },
    semester: {
      required: true,
    },
    group1: {
      required: true,
    },
  };
  const initialValues = {};

  const [formState, setErrors] = useState({
    state: true,
    changed: false,
    uploadClicked: false,
    fileError: true,
    misMatchIds: false,
    files: "",
  });

  const handleSubmit = (data) => {
    if (!validateInput(data)) {
      return;
    }

    var formData = new FormData();
    formData.append(
      "extraInfo",
      JSON.stringify({
        className: `class_of_${activeStudent.Graduation_Year}`,
        ...userData,
        semester: formatSemester(data.semester),
        formNumber: formatFormToNumber(data.year),
        Unique_Id: activeStudent.Unique_Id,
      })
    );

    formData.append("file", data.reportFile[0] || formState.files[0]);

    uploadReportAsync(formData);
  };

  const ejectYears = () => {
    return REPORT_META_INFO.years.map((year, index) => {
      return <option key={index + "class-years"}>{`Form ${year}`}</option>;
    });
  };

  const [wrongFile, setWrongFile] = useState(false);

  const ejectSemesters = () => {
    return REPORT_META_INFO.semesters.map((semester, index) => {
      return (
        <option key={index + "class-years"}>{`Semester ${semester}`}</option>
      );
    });
  };
  const validateInput = (submittedValues) => {
    const errorArr = [];
    if (!submittedValues.year) {
      errorArr.push("Year");
    }

    if (!submittedValues.semester) {
      errorArr.push("semester");
    }
    if (formState.fileError) {
      errorArr.push("reportFile");
    }

    if (errorArr.length) {
      setErrors({
        ...formState,
        uploadClicked: true,
        changed: true,
        state: true,
      });
      return false;
    } else {
      setErrors({
        ...formState,
        changed: true,
        uploadClicked: true,
        state: false,
      });
      return true;
    }
  };

  const checkIfReportAndStudIdMatch = (reportFiless) => {
    const idOFile = reportFiless[0]?.name?.split("-")[1]?.slice(0, 11);
    console.log(idOFile, activeStudent.Unique_Id);
    if (idOFile?.trim() === activeStudent.Unique_Id) {
      return true;
    }
    return false;
  };
  return (
    <div
      className={`w-full h-full flex flex-col overflow-hidden p-2 ${
        formState.misMatchIds ? "bg-red-50" : ""
      }`}
    >
      <TFormValidator
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        isSubmitting={loadingReports}
        className="mt-[20px] w-full flex items-center justify-start flex-col h-full"
      >
        {({ errors, values }) => {
          const errorsArr = Object.keys(errors);
          return (
            <>
              {formState.state &&
              formState.changed &&
              formState.uploadClicked &&
              errorsArr.length ? (
                <div className="text-red-400 whitespace-nowrap animate-rise mt-2 flex mr-2 items-center">
                  {errorsArr.join(",")} not selected.
                </div>
              ) : null}
              {formState.misMatchIds && formState.changed ? (
                <div className="text-red-500 whitespace-nowrap animate-rise mt-2 flex mr-2 items-center">
                  Wrong report selected for student
                </div>
              ) : null}

              <TSelector
                onChange={(selectedAdmissionDate) => {}}
                placeholder="Select Form"
                label=""
                name="year"
                className="bg-[#F5F7F9] border-0 flex "
                outerClassName="mb-[10px] w-[80%]"
              >
                {ejectYears()}
              </TSelector>
              <TSelector
                onChange={(selectedAdmissionDate) => {}}
                placeholder="Select semester"
                label=""
                name="semester"
                className="bg-[#F5F7F9] border-0 flex w-[80%]"
              >
                {ejectSemesters()}
              </TSelector>

              <div className="h-[calc(100%-180px)]  w-full overflow-y-hidden flex flex-col">
                <TSimpleFileUplaoder
                  onChange={(filesPresent) => {
                    if (!filesPresent) {
                      return setErrors({
                        ...formState,
                        state: true,
                        changed: true,
                        fileError: true,
                        misMatchIds: false,
                      });
                    }
                    return setErrors({
                      ...formState,
                      state: true,
                      changed: true,
                      fileError: false,
                      misMatchIds: !checkIfReportAndStudIdMatch(filesPresent),
                      files: filesPresent,
                    });
                  }}
                  placeholder="Select semester"
                  label=""
                  name="reportFile"
                  className="bg-[#F5F7F9] border-0 flex "
                  multiple={false}
                  hideButton={true}
                  filesAccepted={[".pdf"]}
                  hideFileSize={true}
                />
              </div>
              {!formState.fileError && !formState.misMatchIds && (
                <TButton
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit(values);
                  }}
                  styles={{
                    backgroundColor: `${
                      loadingReports ? "bg-gray-400" : "#385064"
                    }`,
                  }}
                  className={`w-full min-h-[40px] max-h-[40px] mt-[10px] mb-[5px]`}
                  icon={<FileUploadOutlined />}
                >
                  Upload Report
                </TButton>
              )}
            </>
          );
        }}
      </TFormValidator>
    </div>
  );
}
