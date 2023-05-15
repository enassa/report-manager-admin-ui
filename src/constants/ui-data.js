import { getAsObjectFromSession } from "./reusable-functions";

export const GRADUATION_YEARS = [
  "2026",
  "2025",
  "2024",
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

export const LOCAL_STORAGE_KEYS = {
  userData: "tfx3213UserData",
  subscriptions: "tfx3213Subscriptions",
  activeReport: "4351activeReport",
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
