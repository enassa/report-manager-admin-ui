import {
  ExpandLessOutlined,
  ExpandMoreOutlined,
  Settings,
} from "@mui/icons-material";
import { ClickAwayListener } from "@mui/material";
import React, { useState } from "react";
import { images } from "../../../../assets/images/images";
import { useAuthService } from "./../../../../store/redux/slices/auth-slice/auth-service";
export default function TUserProfile() {
  const { userData } = useAuthService();
  const [dropProfile, setDropProfile] = useState(false);
  return (
    <div className="flex h-full items-center px-2 py-3 relative">
      {userData?.image === undefined && (
        <span
          style={{
            backgroundImage: `url(${userData?.image})`,
          }}
          className="w-[30px] h-[30px] bg-blue-400 text-white font-extrabold capitalize mr-[10px] rounded-full flex justify-center fit-bg items-center overflow-hidden"
        >
          {userData?.firstName?.charAt(0)}
        </span>
      )}

      <span>
        {userData?.firstName} {userData?.lastName}
      </span>

      {dropProfile ? (
        <ExpandLessOutlined
          className="cursor-pointer"
          onClick={() => setDropProfile(false)}
        />
      ) : (
        <ExpandMoreOutlined
          className="cursor-pointer"
          onClick={() => setDropProfile(true)}
        />
      )}

      {dropProfile && (
        <ClickAwayListener onClickAway={() => setDropProfile(false)}>
          <div className="w-[200px] animate-rise h-[200px] bg-white shadow-neumoNav rounded-md absolute top-[70px] right-5 z-[10]"></div>
        </ClickAwayListener>
      )}
    </div>
  );
}
