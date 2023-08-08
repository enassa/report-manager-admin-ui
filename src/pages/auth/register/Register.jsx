import React, { useEffect } from "react";
import { images } from "../../../assets/images/images";
import { svgs } from "../../../assets/svg/svg";
import {
  RemoveRedEyeOutlined,
  AlternateEmailOutlined,
  LoginSharp,
  LockOutlined,
  Error,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ADMIN_BASE_URL, GRADUATION_YEARS } from "../../../constants/ui-data";
import { useAuthService } from "../../../store/slices/auth-slice/auth-service";
import SlimLoader from "../../../components/slim-loader/SlimLoader";
import TFormValidator from "../../../components/form-validator/FormValidator";
import TAuthInput from "../../../components/auth-input/AuthInput";
import TSelector from "../../../components/input-selector/Selector";
import TButton from "../../../components/button/Button";
import { API } from "../../../App";

export default function Register() {
  const {
    registerOrganization,
    loadingAuth,
    authResponse,
    userIsLoggedIn,
    loginMock,
  } = useAuthService();
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    registerOrganization(data);
  };

  useEffect(() => {
    API.setBaseURL(ADMIN_BASE_URL);
  }, []);

  const validationSchema = {
    schoolCode: {
      required: true,

      //   regexPattern: emailRegex(),zz
    },
    schoolName: {
      required: true,

      //   regexPattern: emailRegex(),zz
    },
    adminId: {
      required: true,

      //   regexPattern: emailRegex(),zz
    },
    adminType: {
      required: true,

      //   regexPattern: emailRegex(),zz
    },
    password: {
      required: true,
    },
    // graduation_year: {
    //   required: true,
    //   maxCharLength: 30,
    //   minCharLength: 1,
    // },
  };
  const initialValues = {};
  console.log(authResponse);
  return (
    <div className="w-full h-full flex justify-center items-center ">
      <div className="md:w-[80%] md:h-[90%] w-[95%] h-[95%] flex">
        <div className="w-[65%] h-full bg-[#F2F3F3] md:flex justify-center items-center flex-col hidden  ">
          <div className="relative">
            <img
              alt="toukanya logo"
              className="h-[15%]"
              src={images.shsReportMgr}
            />
            {svgs.statsReport}
            <div className="absolute top-[300px]"></div>
            <div className="absolute top-[300px] right-[40px] anim/ate-rotate">
              {svgs.spinTarget}
            </div>
          </div>
        </div>
        <div className="w-full md:w-[35%] h-full bg-transparent  md:bg-[rgb(242,243,243)] animate-rise md:p-[30px] p-[10px]  flex justify-center flex-col shadow-neuroInsert rounded-lg overflow-hidden">
          {/* <span
            onClick={() => navigate(ROUTES.dashboard.url)}
            className="text-blue-600"
          >
            Dashboard
          </span> */}
          <div className="w-full absolute top-0 left-0  h-[5px]">
            {loadingAuth && <SlimLoader />}
          </div>

          <TFormValidator
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            isSubmitting={loadingAuth}
            className="mt-[20px] flex justify-start flex-col "
          >
            {({ errors }) => {
              return (
                <div className="w">
                  <TAuthInput
                    leftIcon={<AlternateEmailOutlined />}
                    label="School Name"
                    required={true}
                    // regexPattern={emailRegex(5)}

                    name="schoolName"
                    className=" shadow-neuroInsert border-0 outline-none"
                  />
                  <TAuthInput
                    leftIcon={<AlternateEmailOutlined />}
                    label="School code"
                    required={true}
                    // regexPattern={emailRegex(5)}

                    name="schoolCode"
                    className=" shadow-neuroInsert border-0 outline-none"
                  />
                  <TAuthInput
                    leftIcon={<AlternateEmailOutlined />}
                    label="Admin ID"
                    required={true}
                    // regexPattern={emailRegex(5)}

                    name="adminId"
                    className=" shadow-neuroInsert border-0 outline-none"
                  />
                  <TSelector
                    onChange={(selectedAdmissionDate) => {}}
                    placeholder="Select Form"
                    label="Admin Type"
                    name="adminType"
                    className="bg-[#F5F7F9] border-0 flex "
                    outerClassName=" w-[80%]"
                  >
                    <option>super</option>
                    <option>sub</option>
                  </TSelector>

                  <TAuthInput
                    leftIcon={<LockOutlined />}
                    label="Password*"
                    required={true}
                    type="password"
                    name="password"
                    className="shadow-neuroInsert border-0"
                    rightIcon={<RemoveRedEyeOutlined />}
                  />
                  {/* <TSelector
                    placeholder="Select graduation type"
                    label="Graduation year"
                    name="graduation_year"
                    className="bg-[#F5F7F9] border-0"
                  >
                    {ejectGraduationYears()}
                  </TSelector> */}
                  <TButton
                    styles={{
                      backgroundColor: `${
                        loadingAuth ? "bg-gray-400" : "#385064"
                      }`,
                    }}
                    className={`max-mt-[40px] mt-[5%]`}
                    icon={<LoginSharp />}
                  >
                    Register
                  </TButton>
                  <div className="w-full mt-[20px] h-[5px]">
                    {authResponse?.message !== undefined &&
                      authResponse.page === "login" &&
                      !loadingAuth && (
                        <div className="w-full  bottom-[10%] right-0 flex  justify-center items-center text-red-400 animate-rise">
                          <Error className="text-red-400 mr-2" />{" "}
                          {authResponse?.message}.
                        </div>
                      )}
                  </div>
                  <div className="w-full  h-[5px] relativ">
                    {authResponse?.message !== undefined && !loadingAuth && (
                      <div className="w-full text-xs absolute bottom-[7px] right-0 flex  justify-center items-center text-red-400 animate-rise">
                        <Error className="text-red-400 mr-2" />{" "}
                        {authResponse?.message}.
                      </div>
                    )}
                  </div>
                </div>
              );
            }}
          </TFormValidator>
        </div>
      </div>
    </div>
  );
}
