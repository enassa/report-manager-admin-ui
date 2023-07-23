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
import { useEffect, useState } from "react";
import {
  LOCAL_STORAGE_KEYS,
  SCHOOL_INFO,
  STUDENT_ACTION_TABS,
} from "../../../constants/ui-data";
import {
  getAsObjectFromLocalStorage,
  saveObjectInLocalStorage,
} from "../../../constants/reusable-functions";

export const useStudentDataService = () => {
  const { raiseActivity, endActivity } = useActivityService();
  const [loadingStudentAction, setStudentAction] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const studentList = useSelector(
    (state) => state?.StudentsDataSlice.studentList
  );
  const activeStudent = useSelector(
    (state) => state?.StudentsDataSlice?.activeStudent
  );
  const activeStudentActionTab = useSelector(
    (state) => state?.StudentsDataSlice?.activeStudentActionTab
  );

  const storedActiveStudent = getAsObjectFromLocalStorage(
    LOCAL_STORAGE_KEYS.activeStudent
  );
  const storedActiveStudentActionTab = getAsObjectFromLocalStorage(
    LOCAL_STORAGE_KEYS.activeStudentActionTab
  );
  useEffect(() => {
    if (storedActiveStudent && !activeStudent) {
      dispatch(setActiveStudent(storedActiveStudent));
      dispatch(
        setActiveStuentActionTabs(
          storedActiveStudentActionTab || STUDENT_ACTION_TABS.profile
        )
      );
    }
  }, []);

  const getAllstudentsAsync = async (data) => {
    // console.log(data);
    raiseActivity("Fetching students data...");
    return API.POST(END_POINTS.getStudentsByClass, data)
      .then(async (response) => {
        if (response.data.success) {
          console.log(response.data.data);
          //   setSomeData(response.data.data);
          //   console.log(response.data.data);
          dispatch(updateStudentList(response.data.data));
          successToast("Students report downloaded succesfully");
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

  return {
    getAllstudentsAsync,
    studentList,
    activeStudent,
    activeStudentActionTab,
    loadingStudentAction,
    setActiveStudentAsync,
    setActiveStudentActionTabsAsync,
  };
};
