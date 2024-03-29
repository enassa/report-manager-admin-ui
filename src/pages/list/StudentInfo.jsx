import {
  Edit,
  LocationOnOutlined,
  PeopleAltOutlined,
  PermContactCalendarOutlined,
  PermIdentityOutlined,
  PersonAddAltOutlined,
  PhoneOutlined,
} from "@mui/icons-material";
import React from "react";
import { useStudentDataService } from "../../store/slices/students-slice/student-service";

export default function StudentInfo() {
  const { activeStudent } = useStudentDataService();

  const ejectUserInfo = () => {
    const userInfo = [
      {
        title: "First name",
        value: activeStudent?.First_Name,
        icon: <PermIdentityOutlined />,
        color: "",
      },
      {
        title: "Last name",
        value: activeStudent?.Surname,
        icon: <PeopleAltOutlined />,
      },
      {
        title: "Other names",
        value: activeStudent?.Other_Names,
        icon: <PersonAddAltOutlined />,
      },
      {
        title: "Date of birth",
        value: activeStudent?.DOB,
        icon: <PermContactCalendarOutlined />,
      },
      {
        title: "Gurdian contact",
        value: activeStudent?.Guardians_Contact,
        icon: <PhoneOutlined />,
      },
      {
        title: "Digital Address",
        value: activeStudent?.Digital_Address,
        icon: <LocationOnOutlined />,
      },
    ];

    return userInfo.map((item, index) => {
      return (
        <div
          key={index + "profile"}
          className=" flex justify-start h-[40px] min-h-[40px] mb-[12%]"
        >
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
                value={item?.value || ""}
                onChange={() => {}}
              />
            </span>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="md:w-full md:h-full bw-full h-auto md:max-h-full md:overflow-y-auto md:shadow-none shadow-md md:rounded-none rounded-lg md:mb-0 mb-[40px] bg-gray-50 py-[20px] md:py-0">
      <div className="w-full flex justify-center">
        <div className="w-[80%] flex flex-col justify-center items-center py-[20px] border-dotted border-2 border-gray-200 md:py-[20px]  md:mt-[20px] mt-[5px]">
          <div
            style={{ backgroundImage: `url(${""})` }}
            className="min-w-[150px] min-h-[150px] w-[150px] h-[150px]  fit-bg flex justify-center items-center rounded-full bg-gray-300 shadow-lg"
          >
            <span className="text-9xl text-blue-500 font-bold">
              {activeStudent?.First_Name?.charAt(0)}
            </span>
          </div>
          <span className="w-full justify-center text-xs text-gray-400 mt-[10px]">
            Your wards picture
          </span>
        </div>
      </div>
      <div className="w-full flex justify-center flex-col px-[30px] mt-[10px]">
        <div className="w-full relative">
          <button className="w-[60px] h-[30px] min-h-[30px] min-w-[30px] hover:bg-gray-500 hover:text-white absolute right-0 top-[0px]  bg-gray-600 text-gray-50  shadow-neumoNav rounded-full  flex items-center justify-center">
            <span className="mr-[2px] text-sm ">Edit</span>
            <Edit style={{ fontSize: 15 }} />
          </button>
          <button className="w-[60px] h-[30px] min-h-[30px] min-w-[30px] hover:bg-gray-500 hover:text-white absolute right-0 top-[0px]  bg-white text-gray-600 shadow-neumoNav rounded-full  flex items-center justify-center">
            <span className="mr-[2px] text-sm">Edit</span>
            <Edit style={{ fontSize: 20 }} />
          </button>
        </div>
        {ejectUserInfo()}
      </div>
    </div>
  );
}
