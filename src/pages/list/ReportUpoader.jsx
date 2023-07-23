import React from "react";
import TSelector from "../../components/input-selector/Selector";
import { REPORT_META_INFO, SCHOOL_INFO } from "../../constants/ui-data";
import TButton from "../../components/button/Button";
import TFormValidator from "../../components/form-validator/FormValidator";
import { useReportService } from "../../store/slices/report-slice/report-service";
import { useStudentDataService } from "../../store/slices/students-slice/student-service";
import { FileUploadOutlined } from "@mui/icons-material";
import TSimpleFileUplaoder from "../../components/simple-file-uploader/simple-file-uplaoder";

export default function ReportUpoader() {
  const { uploadReportsAsync, loadingReports } = useReportService();
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

  const handleSubmit = (data) => {
    console.log(data);
    uploadReportsAsync({
      extraInfo: {
        ...SCHOOL_INFO,
        className: "class_of_2024",
      },
      data: { ...activeStudent },
    });
    // return;
    // setLoading(true);
    // setTimeout(() => {
    //   navigate(ROUTES.reports.url);
    // }, 3000);
    // mockMode ? loginMock(data) : loginAsync(data)();
  };
  const ejectYears = () => {
    return REPORT_META_INFO.years.map((year, index) => {
      return <option key={index + "class-years"}>Year {year}</option>;
    });
  };

  const ejectSemesters = () => {
    return REPORT_META_INFO.semesters.map((year, index) => {
      return <option key={index + "class-years"}>Semester {year}</option>;
    });
  };

  return (
    <div className="w-full h-full flex flex-col">
      <TFormValidator
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        isSubmitting={loadingReports}
        className="mt-[20px] w-full flex items-center justify-center flex-col h-full"
      >
        {({ errors, values }) => {
          console.log(errors, values);
          return (
            <>
              <TSelector
                onChange={(selectedAdmissionDate) => {}}
                placeholder="Select graduation type"
                label=""
                name="year"
                className="bg-[#F5F7F9] border-0 flex "
                outerClassName="mb-[10px]"
              >
                {ejectYears()}
              </TSelector>
              <TSelector
                onChange={(selectedAdmissionDate) => {}}
                placeholder="Select semester"
                label=""
                name="semester"
                className="bg-[#F5F7F9] border-0 flex "
              >
                {ejectSemesters()}
              </TSelector>
              {/* <input
                type="file"
                multiple={true}
                accept={`.pdf`}
                className="flex"
                name="reportFile"
              /> */}
              <TSimpleFileUplaoder
                onChange={(selectedAdmissionDate) => {}}
                placeholder="Select semester"
                label=""
                name="reportFile"
                className="bg-[#F5F7F9] border-0 flex "
                multiple={true}
              />
              <div className="w-full flex"></div>
              <TButton
                styles={{
                  backgroundColor: `${
                    loadingReports ? "bg-gray-400" : "#385064"
                  }`,
                }}
                className={`w-full min-h-[40px] mt-[10px] mb-[5px]`}
                icon={<FileUploadOutlined />}
              >
                Upload Report
              </TButton>
              {/* <input type="radio" value="value1" name="group1" />
              <input type="radio" value="value2" name="group1" />
              <select name="age">
                <option>one</option>
                <option>two</option>
                <option>three</option>
              </select>
              <textarea id="w3review" name="w3review">
                {" "}
              </textarea> */}

              {/* <div className="w-full mt-[20px] h-[5px]">
                  {authResponse?.message !== undefined &&
                    authResponse.page === "login" &&
                    !loadingAuth && (
                      <div className="w-full  bottom-[10%] right-0 flex  justify-center items-center text-red-400 animate-rise">
                        <Error className="text-red-400 mr-2" />{" "}
                        {authResponse?.message}.
                      </div>
                    )}
                </div>
                <div className="w-full  h-[5px] relativ">
                  {authResponse?.message !== undefined && !loadingAuth && (
                    <div className="w-full text-xs absolute bottom-[7px] right-0 flex  justify-center items-center text-red-400 animate-rise">
                      <Error className="text-red-400 mr-2" />{" "}
                      {authResponse?.message}.
                    </div>
                  )}
                </div> */}
            </>
          );
        }}
      </TFormValidator>
    </div>
  );
}
