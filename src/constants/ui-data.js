import {
  getAsObjectFromLocalStorage,
  getAsObjectFromSession,
} from "./reusable-functions";

export const STUDENT_ACTION_TABS = {
  profile: "Profile",
  downloads: "Downloads",
  uploads: "Uploads",
};

export const BULK_UPLOAD_OPTIONS = {
  reportCards: "Report Cards",
  excelData: "Student Excel File",
};

export const PROGRAMMES = [
  "General Science",
  "General Arts",
  "Visual Arts",
  "Home Economics",
  "Business",
  "Agricultural Science",
];
export const SEMESTERS = [1, 2, 3, 4];
export const GRADUATION_YEARS = [
  "2023",
  "2022",
  "2021",
  "2020",
  "2019",
  "2018",
  "2017",
  "2016",
  "2015",
  "2014",
  "2013",
  "2012",
  "2011",
  "2010",
  "2009",
  "2008",
  "2007",
  "2006",
  "2005",
  "2004",
  "2002",
  "2001",
  "2000",
];
export const BASE_URL = () =>
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_DEV_BASE_URL
    : getAsObjectFromLocalStorage(LOCAL_STORAGE_KEYS.selectedSchool)?.url;

// export const BASE_URL = () =>
//   import.meta.env.MODE === "development"
//     ? "https://koinoreportmanager.herokuapp.com"
//     : getAsObjectFromLocalStorage(LOCAL_STORAGE_KEYS.selectedSchool)?.url;

// export const BASE_URL = () =>
//   import.meta.env.MODE === "development"
//     ? getAsObjectFromLocalStorage(LOCAL_STORAGE_KEYS.selectedSchool)?.url
//     : getAsObjectFromLocalStorage(LOCAL_STORAGE_KEYS.selectedSchool)?.url;

export const REPORT_META_INFO = {
  years: [1, 2, 3, 4],
  semesters: [1, 2, 3],
};
export const SCHOOL_INFO = {
  schoolCode: "0010110",
  schoolName: "Achimota_secondary",
};
// 0010110_Achimota_secondary
export const SERVICE_CODES = {
  reportService: "report3b5kb38lv30m3v",
  superMarket: "marketg76rd7fg86fr37",
  documentRequest: "document7dbdydf58d6d5",
};
export const ADMIN_BASE_URL = "https://super-admin-shs-report.ey.r.appspot.com";
// "https://superadmin-shs-report-31a042526be6.herokuapp.com";

export const LOCAL_STORAGE_KEYS = {
  selectedSchool: "234hgh234j3Se32ctedSchool",
  userData: "tfx3213dsdUserData",
  subscriptions: "tfxsd32122343Subscriptions",
  activeReport: "4351actiasdfveReport",
  activeStudent: "64543achjktiveStudent",
  activeStudentActionTab: "23432actgdfiveStudentActionTab",
};
export const verifyServiceAccess = (serviceCode) => {
  const subscriptions = getAsObjectFromSession(
    LOCAL_STORAGE_KEYS.subscriptions
  );
  const isSubScriped =
    !!subscriptions &&
    subscriptions?.find(
      (subscription) => subscription?.ServiceName === serviceCode
    );
  return isSubScriped;
};

export const RATE_AMOUNTS = {
  downloadReport: 2,
  reportService: 5,
};

export const openTrades = [
  {
    Id: "",
    Name: "MSFT",
    Programme: "Science",
    Class: "",
    Track: "",
    "Graduation-Year": "",
    "Form-Number": "",
    Contact: "",
    House: "",
    "Bece-Index": "",
    DOB: 740,
    status: 740,

    // side: "BUY",
    // currency: "USD",
    // splited: true,
    // split_values: [100, 500, 140],
    // fulfilled: 20,
    // profit: 200,
    // time: "20:006",
    // date: "20-03-2022",
    // duration: "9658",
    // status: "pending",
  },
];
export const dummyStudents = [
  {
    Name: "ODEI-GYAMFI MARY",
    BECE_Index: "2210671",
    Programme: "ARTS 4-B SINGLE-TRACK",
    Class: "ARTS 4-B",
    Guardians_Contact: null,
    Call_Contact: null,
    Track: "SINGLE",
    House: null,
    Graduation_Year: "2024",
    Current_Year: "2",
  },
  {
    Name: "ODEI-GYAMFI MARTHA",
    BECE_Index: "2213018",
    Programme: "ARTS 4-B SINGLE-TRACK",
    Class: "ARTS 4-B",
    Guardians_Contact: null,
    Call_Contact: null,
    Track: "SINGLE",
    House: null,
    Graduation_Year: "2024",
    Current_Year: "2",
  },
];
