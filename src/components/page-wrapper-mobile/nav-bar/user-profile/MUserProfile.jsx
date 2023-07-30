import {
  ExpandLessOutlined,
  ExpandMoreOutlined,
  Logout,
  Settings,
} from "@mui/icons-material";
import { ClickAwayListener } from "@mui/material";
import React, { useState } from "react";
import { images } from "../../../../assets/images/images";
import { useAuthService } from "../../../../store/slices/auth-slice/auth-service";
import { SCHOOL_INFO } from "../../../../constants/ui-data";

export default function MUserProfile() {
  const { userData, logOut } = useAuthService();
  const [dropProfile, setDropProfile] = useState(false);
  return (
    <div className="flex h-full  items-center md:px-2 py-3 relative ">
      <span className="mr-2 lowercase text-blue-800">
        @{userData?.adminId + " " ?? "Username"}
      </span>

      <span
        style={{
          backgroundImage: `url(${userData?.image})`,
        }}
        onClick={() => setDropProfile(true)}
        className="w-[30px] capitalize h-[30px] cursor-pointer bg-gray-200 text-blue-600 shadow-neuroInsert font-extrabold  mr-[10px] rounded-full flex justify-center fit-bg items-center overflow-hidden"
      >
        {userData?.adminId?.charAt(0)}
      </span>

      {/* {dropProfile ? (
        <ExpandLessOutlined
          className="cursor-pointer hidden  md:visible"
          onClick={() => setDropProfile(false)}
        />
      ) : (
        <ExpandMoreOutlined
          className="cursor-pointer hidden md:visible"
          onClick={() => setDropProfile(true)}
        />
      )} */}

      {dropProfile && (
        <ClickAwayListener onClickAway={() => setDropProfile(false)}>
          <div className="w-[200px] p-2 animate-rise flex flex-col justify-between items-center h-[230px] bg-white shadow-neuroRaise rounded-md absolute top-[70px] md:right-[10px] right-[20px] z-[10]">
            <div className="w-full flex justify-center">
              <div
                style={{ backgroundImage: `url(${""})` }}
                className="min-w-[100px] min-h-[100px] w-[100px] h-[100px]  fit-bg flex justify-center items-center rounded-full bg-gray-300 shadow-lg"
              >
                <span className="text-7xl text-blue-500 font-bold">
                  {userData?.First_Name?.charAt(0)}
                </span>
              </div>
            </div>
            <span className="mr-2 capitalize  text-sm mt-2">
              <span className="text-blue-600">
                {" "}
                {`${userData?.First_Name}, `}
              </span>
              <span className="text-xs">
                {" "}
                {userData?.Surname} {userData?.Other_Names}
              </span>{" "}
            </span>

            <div
              onClick={() => logOut()}
              className="w-[60%]  cursor-pointer transition-all rounded-md hover:bg-gray-100  text-gray-500  h-[40px] bg-gray-50 flex items-center justify-center"
            >
              <Logout />
              <span className="ml-2">Logout </span>
            </div>
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
}
