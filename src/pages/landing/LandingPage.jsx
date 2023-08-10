import React, { useEffect, useState } from "react";
import { images } from "../../assets/images/images";
import ShoolCards from "./ShoolCards";
import MNavBar from "../../components/page-wrapper-mobile/nav-bar/MNavBar";
import TSelector from "./../../components/input-selector/Selector";
import TButton from "../../components/button/Button";
import { LoginSharp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuthService } from "../../store/slices/auth-slice/auth-service";
import { ROUTES } from "../../constants/route-links";
import SMSSender from "../../components/sms-sender/SMSSender";

export default function LandingPage() {
  // const BASE_URL =
  //   import.meta.env.MODE === "development"
  //     ? import.meta.env.VITE_DEV_BASE_URL
  //     : import.meta.env.VITE_PROD_BASE_URL;
  const { selectedSchool, setSelectedSchoolAsync } = useAuthService();
  // const API = new API_HANDLER(BASE_URL);

  const navigate = useNavigate();

  const schools = [
    {
      name: "Achimota Senior High School",
      image: images.achimota,
      logo: images.achimotaLogo,
      schoolName: "Achimota Senior High School",
      schoolCode: "0010110",
      url: "https://achimota-shs-reports-api.ew.r.appspot.com",
      // url: "https://achimota-shs-report-bdd7a4b30ad8.herokuapp.com",
    },
    {
      name: "Ghanata Senior High School",
      image: images.ghanata,
      logo: images.ghanataLogo,
      schoolName: "Ghanata Senior High School",
      schoolCode: "0010401",
      url: "https://ghanata-shs-reports-api-395508.oa.r.appspot.com",
      // url: "https://ghanata-shs-report-8b6b031252f1.herokuapp.com",
    },
  ];

  // const [selectedSchool, setSelectedSchool] = useState({
  //   name: "",
  //   image: images.studentImage,
  // });

  const handleSchoolChange = (school) => {
    const chosenSchool = schools.find((item) => item.name === school);
    setSelectedSchoolAsync(chosenSchool);
  };

  const ejectSchoolOptions = () => {
    return schools.map((item, index) => {
      return (
        <option key={index} image={item.logo}>
          {item.name}
        </option>
      );
    });
  };

  const handleSubmitSchool = () => {
    navigate(ROUTES.login.url);
  };

  const imageForBackGround = selectedSchool || {
    name: "",
    image: images.studentImage,
  };

  return (
    <div
      style={{ backgroundImage: `url(${imageForBackGround.image})` }}
      className="relative w-[100vw] h-[100vh] flex fit-bg justify-center  items-center flex-col overflow-hidden"
    >
      {/* <div className="w-full h-full fixed top-0 right-0 z-[99999] flex justify-center bg-white">
        <SMSSender />
      </div> */}
      <div className="w-full h-full absolute flex top-0 right-0 bg-[#1515159a] "></div>
      {/* <div className="flex flex-col w-full bg-white  min-h-[100px]"></div> */}
      <div className="w-full  h-full flex  flex-col justify-between items-center z-[500]">
        <div className="w-full flex justify-start items-center font-extrabold md:text-bgTrade text-white p-[10px] z-[600] ml-2 ">
          <div className="min-w-[30px] min-h-[30px] max-w-[50px] max-h-[50px] border-2 border-bgTrade mr-2 rounded-full flex justify-center items-center bg-bgTrade">
            <img src={images.shsReportLogo} className="w-[20px] h-[20px]" />
          </div>
          <span className="text-2xl">SHS Reports</span>
        </div>
        <div className="w-full p-4 h-full flex flex-col md:flex-row justify-center md:justify-start items-center">
          <div className="w-full h-full md:flex hidden flex-col items-center justify-center  ">
            <div
              style={{ borderRadius: "0px 1000px 1000px 0px" }}
              className="w-[50%] h-[100vh] absolute flex flex-col justify-center border-2 bg-[#ffffffd0] border-white rounded-full"
            >
              <h5 className="mb-2 text-4xl font-bold text-gray-white">
                Join our client circle.
                <br /> Distribute reports easily.
              </h5>
              <span>
                Unlock the power of parental involvement <br />
                Join our transformative student report sharing webApp and
                <br />
                strengthen school-home partnerships
              </span>
            </div>
          </div>
          <div className="w-full h-full flex flex-col justify-center items-center animate-rise">
            <div className="w-full h-full md:max-w-[300px] flex justify-center items-center flex-col z-[600]">
              <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                Please select a school
              </h5>
              <TSelector
                placeholder="Select school"
                label=""
                name="admission_year"
                className="bg-[#F5F7F9] border-0 mt-2"
                labelClassName="text-gray-100"
                onChange={(value) => {
                  handleSchoolChange(value);
                  console.log(value);
                }}
                value={selectedSchool?.name}
              >
                {ejectSchoolOptions()}
              </TSelector>
              <TButton
                onClick={() => handleSubmitSchool()}
                styles={
                  {
                    // backgroundColor: "bg-gray-400",
                  }
                }
                className={`max-mt-[40px] mt-[5%]`}
                icon={<LoginSharp />}
              >
                Continue
              </TButton>
            </div>
          </div>
        </div>
        <div className="text-gray-300 flex flex-col p-2">
          <span>Powered by Hallowed IT Labs</span>
          <span className="text-xs flex items-center w-full justify-center">
            Copy right &copy; 2023
          </span>
        </div>
      </div>
    </div>
  );
}
