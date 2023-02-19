import React from "react";
import { images } from "../../assets/images/images";
import {
  BusinessCenter,
  Delete,
  Edit,
  MoreVert,
  Settings,
  ShowChart,
  AssessmentOutlined,
  DownloadForOfflineOutlined,
  FileDownloadOutlined,
  FileOpenOutlined,
  PersonAddAltOutlined,
  PermIdentityOutlined,
  PeopleAltOutlined,
  PermContactCalendarOutlined,
  PhoneOutlined,
  LocationOnOutlined,
  CalendarMonthOutlined,
  SchoolOutlined,
  EmojiPeopleOutlined,
  HouseOutlined,
  BusinessOutlined,
  DateRangeOutlined,
  PersonAddAlt,
  PermIdentity,
  PeopleAlt,
  PermContactCalendar,
} from "@mui/icons-material";
import { replaceUnderscoreWithSpace } from "../../constants/reusable-functions";

export default function Profile() {
  const ejectUserInfo = () => {
    const userData = [
      {
        title: "First name",
        value: "Nathaniel",
        icon: <PermIdentityOutlined />,
        color: "",
      },
      {
        title: "Last name",
        value: "Assan",
        icon: <PeopleAltOutlined />,
      },
      {
        title: "Other names",
        value: "Ewudzi",
        icon: <PersonAddAltOutlined />,
      },
      {
        title: "Date of birth",
        value: "11 January 2022",
        icon: <PermContactCalendarOutlined />,
      },
      {
        title: "Gurdian contact",
        value: "0549546822",
        icon: <PhoneOutlined />,
      },
      {
        title: "Digital Address",
        value: "GH-34-43-432",
        icon: <LocationOnOutlined />,
      },
    ];
    //   first_name: "Nathaniel",
    //   last_name: "Assan",
    //   date_Of_birth: "11 January 2022",
    //   programme: "General Science",
    //   classNumber: "6",
    //   formNumber: "2",
    //   enrollMentYear: 2019,
    //   graduationYear: 2021,
    //   cohort: "Green",
    //   };
    // const userInfo = Object.keys(userData);
    return userData.map((item, index) => {
      return (
        <div className=" flex justify-start h-[40px] min-h-[40px] mb-[12%]">
          <div className="h-full flex justify-center items-center mr-[10px]">
            <span className="rounded-full w-[40px] text-blue-900 h-40px] min-w-[40px] min-h-[40px] shadow-md flex justify-center items-center">
              {item?.icon}
            </span>
          </div>
          <div className="flex flex-col">
            <label className="font-extrabold w-full flex  text-gray-800 font-light ">
              {item?.title}
            </label>
            <span className="w-full flex justify-end  items-center">
              <input
                className="w-full flex items-center border-b-[1px] border-b-gray-300 bg-transparent outline-none"
                value={item?.value}
                onChange={() => {}}
              />
            </span>
          </div>
        </div>
      );
    });
  };
  const ejectSchoolInfo = () => {
    const userData = [
      {
        title: "Programme",
        value: "General Science",
        icon: <PermIdentityOutlined />,
        color: "",
      },
      {
        title: "Cohort",
        value: "Green",
        icon: <PeopleAltOutlined />,
      },
      {
        title: "Class",
        value: "2 Arts 2 Green",
        icon: <PersonAddAltOutlined />,
      },
      {
        title: "Year",
        value: "2",
        icon: <PermContactCalendarOutlined />,
      },
      {
        title: "Residency Status",
        value: "Boarder",
        icon: <BusinessOutlined />,
      },
      {
        title: "House name",
        value: "Slessor House",
        icon: <HouseOutlined />,
      },
      {
        title: "Class teacher",
        value: "Eugene Nunoo",
        icon: <EmojiPeopleOutlined />,
      },
      {
        title: "Class teacher contact",
        value: "0549546822",
        icon: <PhoneOutlined />,
      },
      {
        title: "Enrollment date",
        value: "20th July 2020",
        icon: <CalendarMonthOutlined />,
      },
      {
        title: "Grduation date",
        value: "20th June 2023",
        icon: <SchoolOutlined />,
      },
    ];
    //   first_name: "Nathaniel",
    //   last_name: "Assan",
    //   date_Of_birth: "11 January 2022",
    //   programme: "General Science",
    //   classNumber: "6",
    //   formNumber: "2",
    //   enrollMentYear: 2019,
    //   graduationYear: 2021,
    //   cohort: "Green",
    //   };
    // const userInfo = Object.keys(userData);
    return userData.map((item, index) => {
      return (
        <div className=" flex justify-start h-[40px] min-h-[40px] mb-[12%]">
          <div className="h-full flex justify-center items-center mr-[10px]">
            <span className="rounded-full w-[40px] text-blue-900 h-40px] min-w-[40px] min-h-[40px] shadow-md flex justify-center items-center">
              {item?.icon}
            </span>
          </div>
          <div className="flex flex-col">
            <label className="font-extrabold w-full flex  text-gray-800 font-light ">
              {item?.title}
            </label>
            <span className="w-full flex justify-end  items-center">
              <input
                className="w-full flex items-center border-b-[1px] border-transparent bg-transparent outline-none"
                disabled={true}
                value={item?.value}
                onChange={() => {}}
              />
            </span>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="w-full h-full flex flex-col md:flex-row bg-gray-100 md:px-0 px-[10px] py-[20px] md:py-[0px]">
      <div className="md:w-[400px] md:h-full bw-full h-auto md:max-h-full md:overflow-y-auto md:shadow-none shadow-md md:rounded-none rounded-lg md:mb-0 mb-[40px] bg-gray-50 py-[20px] md:py-0">
        <div className="w-full flex justify-center">
          <div className="w-[80%] flex flex-col justify-center items-center py-[20px] border-dotted border-2 border-gray-200 md:py-[20px]  md:mt-[20px] mt-[5px]">
            <div
              style={{ backgroundImage: `url(${images.myPassport})` }}
              className="min-w-[150px] min-h-[150px] w-[150px] h-[150px] fit-bg flex rounded-full bg-gray-300 shadow-lg"
            ></div>
            <span className="w-full justify-center text-xs text-gray-400 mt-[10px]">
              Your wards picture
            </span>
          </div>
        </div>
        <div className="w-full flex justify-center flex-col px-[30px] mt-[10px]">
          <div className="w-full relative">
            <button className="w-[60px] h-[30px] min-h-[30px] min-w-[30px] hover:bg-gray-500 hover:text-white absolute right-0 top-[0px]  bg-gray-600 text-gray-50  shadow-neumoNav rounded-full  flex items-center justify-center">
              <span className="mr-[2px] text-sm">Edit</span>
              <Edit style={{ fontSize: 15 }} />
            </button>
            {/* <button className="w-[60px] h-[30px] min-h-[30px] min-w-[30px] hover:bg-gray-500 hover:text-white absolute right-0 top-[0px]  bg-white text-gray-600 shadow-neumoNav rounded-full  flex items-center justify-center">
              <span className="mr-[2px] text-sm">Edit</span>
              <Edit style={{ fontSize: 20 }} />
            </button> */}
          </div>
          {ejectUserInfo()}
        </div>
      </div>
      <div
        style={{ justifyContent: "center", alignItems: "start" }}
        className=" md:grid md:grid-cols-3 flex flex-col w-full  md:h-full  h-auto gap-2 p-[30px]  md:shadow-none shadow-md md:rounded-none rounded-lg md:mb-0 mb-[0px] bg-white py-[20px] md:py-[30px]"
      >
        {ejectSchoolInfo()}
      </div>
      <div className="h-[30px] min-h-[30px]"></div>
    </div>
  );
}
