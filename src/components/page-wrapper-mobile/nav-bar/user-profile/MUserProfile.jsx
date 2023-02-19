import {
  ExpandLessOutlined,
  ExpandMoreOutlined,
  Settings,
} from "@mui/icons-material";
import { ClickAwayListener } from "@mui/material";
import React, { useState } from "react";
import { images } from "../../../../assets/images/images";

// import { useAuthService } from "../../../../store-and-services/auth-slice/auth-service";

export default function MUserProfile() {
  // const { userData } = useAuthService();
  const userData = { name: "Nathaniel Assan", image: images?.myPassport };
  const [dropProfile, setDropProfile] = useState(false);
  console.log(userData.image);
  return (
    <div className="flex h-full items-center px-2 py-3 relative">
      <span className="mr-2">{userData?.name ?? "Nathaniel Assan"}</span>

      <span
        style={{
          backgroundImage: `url(${userData?.image})`,
        }}
        onClick={() => setDropProfile(true)}
        className="w-[30px] h-[30px] bg-blue-400 text-white font-extrabold capitalize mr-[10px] rounded-full flex justify-center fit-bg items-center overflow-hidden"
      >
        {(userData?.image === undefined
          ? userData?.name ?? "Nathaniel"
          : ""
        )?.charAt(0)}
      </span>

      {dropProfile ? (
        <ExpandLessOutlined
          className="cursor-pointer invisible md:visible"
          onClick={() => setDropProfile(false)}
        />
      ) : (
        <ExpandMoreOutlined
          className="cursor-pointer invisible md:visible"
          onClick={() => setDropProfile(true)}
        />
      )}

      {dropProfile && (
        <ClickAwayListener onClickAway={() => setDropProfile(false)}>
          <div className="w-[200px] animate-rise h-[200px] bg-white shadow-neumoNav rounded-md absolute top-[70px] md:right-[20px] right-[40px] z-[10]"></div>
        </ClickAwayListener>
      )}
    </div>
  );
}
