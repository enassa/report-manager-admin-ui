import { createSlice } from "@reduxjs/toolkit";
import { STUDENT_ACTION_TABS } from "../../../constants/ui-data";
const initialState = {
  studentList: [],
  selectedClass: "",
  activeStudent: undefined,
  reports: [],
  activeStudentActionTab: STUDENT_ACTION_TABS.profile,
};
export const StudentsDataSlice = createSlice({
  name: "studentList",
  initialState,
  reducers: {
    getStudentsData: (state) => {
      return state.studentsData;
    },
    updateStudentList: (state, { payload }) => {
      // console.log(payload);
      state.studentList = payload;
    },
    updateStudentInfo: (state, { payload }) => {
      const allStudents = state.studentsData;
      const indexOfStudent = allStudents.findIndex(
        (transaction) => transaction.PaymentRef !== payload.PaymentRef
      );
      allStudents.splice(indexOfStudent, 1, payload);
      state.transactions = [...allStudents];
    },
    setActiveStudent: (state, { payload }) => {
      state.activeStudent = payload;
    },
    setActiveStuentActionTabs: (state, { payload }) => {
      state.activeStudentActionTab = payload;
    },
  },
});
export const {
  getStudentsData,
  updateStudentInfo,
  updateStudentList,
  setActiveStudent,
  setActiveStuentActionTabs,
} = StudentsDataSlice.actions;
export default StudentsDataSlice.reducer;
