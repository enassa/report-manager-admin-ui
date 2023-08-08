import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API } from "../../../App";
import { END_POINTS } from "../../../constants/urls";
import { useActivityService } from "../activity-slice/activity-service";
import { errorToast, successToast } from "../../../components/toast/toastify";
import {
  updateStudentList,
  setActiveStudent,
  setActiveStuentActionTabs,
} from "./student-slice";
import { useState } from "react";
import { BASE_URL, LOCAL_STORAGE_KEYS } from "../../../constants/ui-data";
import {
  getAsObjectFromLocalStorage,
  getDurationOfStudies,
  saveObjectInLocalStorage,
} from "../../../constants/reusable-functions";
import axios from "axios";
import { useAuthService } from "../auth-slice/auth-service";
import { DataArrayRounded } from "@mui/icons-material";

export const useStudentDataService = () => {
  const { raiseActivity, endActivity } = useActivityService();
  const { selectedSchool } = useAuthService();
  const [loadingStudentAction] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const studentList = useSelector(
    (state) => state?.StudentsDataSlice.studentList
  );

  const fetchStudentList = useSelector(
    (state) => state?.StudentsDataSlice.fetchStudentList
  );
  const activeStudent = useSelector(
    (state) => state?.StudentsDataSlice?.activeStudent
  );
  const activeStudentActionTab = useSelector(
    (state) => state?.StudentsDataSlice?.activeStudentActionTab
  );

  const getAllstudentsAsync = async (data) => {
    // console.log(data);
    raiseActivity("Fetching students data...");
    return API.POST(END_POINTS.getStudentsByClass, data)
      .then(async (response) => {
        console.log(response);

        if (response.data.success) {
          console.log(response.data.data);
          //   setSomeData(response.data.data);
          //   console.log(response.data.data);

          dispatch(updateStudentList(response.data.data));
          successToast(`Fetched student data successfully `);
        }
      })
      .catch((error) => {
        errorToast("Could not unlock report. Please contact the school");
      })
      .finally(() => {
        endActivity();
      });
  };

  const setActiveStudentAsync = (activeStudent) => {
    saveObjectInLocalStorage(LOCAL_STORAGE_KEYS.activeStudent, activeStudent);
    dispatch(setActiveStudent(activeStudent));
  };

  const setActiveStudentActionTabsAsync = (activeTab) => {
    saveObjectInLocalStorage(
      LOCAL_STORAGE_KEYS.activeStudentActionTab,
      activeTab
    );
    dispatch(setActiveStuentActionTabs(activeTab));
  };

  const uploadBulkStudentDataAsync = (formData) => {
    raiseActivity("Uploading Student data");
    axios
      .post(BASE_URL() + END_POINTS.uploadStudentsFile, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data.success);
        if (res.data.success) {
          successToast("Data uploaded successfully");
          return;
        }
        errorToast("Data upload failed");
      })
      .catch((error) => {
        errorToast("Data upload failed");
        console.log(error);
      })
      .finally(() => {
        endActivity();
      });
  };

  const transformData = (studJSONObj) => {
    const data = studJSONObj.data;
    const allData = [];
    const workbookNames = Object.keys(data) || [];
    const graduationYear = studJSONObj.extraInfo?.className.split("_")[2];
    const enrollmentYear = graduationYear - getDurationOfStudies();
    const getCurrentYear = () => {
      const currentYear = new Date().getFullYear();
      let studentYear;
      if (currentYear <= graduationYear) {
        studentYear = getDurationOfStudies() - (graduationYear - currentYear);
        return studentYear <= 1 ? 1 : studentYear;
      }
      return "GRADUATED";
    };
    const formNumber = getCurrentYear() || 1;

    console.log(enrollmentYear, formNumber, graduationYear);
    workbookNames.map((workbook, index) => {
      return data[workbook].map((row, count) => {
        const allNames = row["Name"].split(" ");
        const names = {
          firstName: allNames.pop(),
          lastName: allNames.shift(),
          otherNames: allNames.join(" "),
        };
        allData.push({
          Class: row["Class Stream"],
          Name: row["Name"],
          Gender: row["Gender"],
          Index: row["Index"],
          BECE_Index: row["JHS No."],
          Residential_Status: row["Residential Status"],
          Track: row["Track"],
          Unique_Id: row["Unique ID"],
          First_Name: names.firstName,
          Surname: names.lastName,
          Other_Names: names.otherNames,
          Programme: studJSONObj.extraInfo?.programme,
          JHS_No: row["JHS No."],
          Email: null,
          DOB: null,
          Guardians_Contact: null,
          Whatsapp: null,
          Call_Contact: null,
          WASSCE_Index: null,
          Region: null,
          City: null,
          Area: null,
          House: null,
          Guardians_Name: null,
          Guardians_Email: null,
          Guardians_Profession: null,
          Image: null,
          Current_Year: formNumber,
          Enrollment_Year: enrollmentYear,
          Graduation_Year: graduationYear,
          Digital_Address: "",
        });
      });
    });
    return { studentData: allData, extraInfo: studJSONObj.extraInfo };
  };

  const uploadStudentDataJsonAsync = async (data) => {
    const dataToSend = transformData(data);

    // console.log(data);
    raiseActivity("Uploading Student data");
    return API.POST(END_POINTS.uploadStudentsObjects, dataToSend)
      .then(async (res) => {
        console.log(res);

        console.log(res.data.success);
        if (res.data.success) {
          successToast("Data uploaded successfully");
          return;
        }

        errorToast("Data upload failed");
      })
      .catch((error) => {
        errorToast("Data upload failed");
        console.log(error);
      })
      .finally(() => {
        endActivity();
      });
  };

  return {
    getAllstudentsAsync,
    studentList,
    activeStudent,
    activeStudentActionTab,
    loadingStudentAction,
    setActiveStudentAsync,
    setActiveStudentActionTabsAsync,
    uploadStudentDataJsonAsync,
    uploadBulkStudentDataAsync,
    fetchStudentList,
  };
};
