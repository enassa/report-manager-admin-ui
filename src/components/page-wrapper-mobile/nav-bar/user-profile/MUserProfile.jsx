import {
  ExpandLessOutlined,
  ExpandMoreOutlined,
  Settings,
} from "@mui/icons-material";
import { ClickAwayListener } from "@mui/material";
import React, { useState } from "react";
import { images } from "../../../../assets/images/images";
import { useAuthService } from "../../../../store/slices/auth-slice/auth-service";

export default function MUserProfile() {
  const { userData } = useAuthService();
  const [dropProfile, setDropProfile] = useState(false);
  console.log(userData.image);
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
        className="w-[30px] h-[30px] bg-bgTrade text-white font-extrabold capitalize mr-[10px] rounded-full flex justify-center fit-bg items-center overflow-hidden"
      >
        {userData?.First_Name.charAt(0)}
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
      )}

      {dropProfile && (
        <ClickAwayListener onClickAway={() => setDropProfile(false)}>
          <div className="w-[200px] hidden animate-rise h-[200px] bg-white shadow-neumoNav rounded-md absolute top-[70px] md:right-[20px] right-[40px] z-[10]"></div>
        </ClickAwayListener>
      )} */}
    </div>
  );
}
