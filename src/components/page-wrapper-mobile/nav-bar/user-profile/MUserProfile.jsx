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

export default function MUserProfile() {
  const { userData, logOut } = useAuthService();
  const [dropProfile, setDropProfile] = useState(false);
  console.log(userData?.image);
  return (
    <div className="flex h-full items-center md:px-2 py-3 relative ">
      <span className="mr-2 capitalize">
        {userData?.First_Name ?? "Username"}
      </span>

      <span
        style={{
          backgroundImage: `url(${userData?.image})`,
        }}
        onClick={() => setDropProfile(true)}
        className="w-[30px] h-[30px] cursor-pointer bg-bgTrade text-white font-extrabold capitalize mr-[10px] rounded-full flex justify-center fit-bg items-center overflow-hidden"
      >
        {userData?.First_Name?.charAt(0)}
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
          <div className="w-[200px] p-2 animate-rise flex flex-col justify-between items-center h-[200px] bg-white shadow-neumoNav rounded-md absolute top-[70px] md:right-[10px] right-[20px] z-[10]">
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
            <div
              onClick={() => logOut()}
              className="w-[60%]  cursor-pointer transition-all rounded-md hover:bg-bgTrade text-gray-700 hover:text-white h-[40px] bg-gray-50 flex items-center justify-center"
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
