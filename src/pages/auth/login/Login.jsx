import React, { useState } from "react";
import TFormValidator from "./../../../components/form-validator/FormValidator";
import { images } from "./../../../assets/images/images";
import { svgs } from "./../../../assets/svg/svg";
import SlimLoader from "./../../../components/slim-loader/SlimLoader";
import TAuthInput from "./../../../components/auth-input/AuthInput";
import TButton from "./../../../components/button/Button";
import {
  RemoveRedEyeOutlined,
  AlternateEmailOutlined,
  LoginSharp,
  LockOutlined,
  Error,
  BarChart,
  TrendingUp,
  RunningWithErrorsOutlined,
} from "@mui/icons-material";
import { ROUTES } from "../../../constants/route-links";
import { useNavigate } from "react-router-dom";
import { Routes } from "react-router";
import TSelector from "./../../../components/input-selector/Selector";
import { GRADUATION_YEARS, schoolInfo } from "./../../../constants/ui-data";
import { useAuthService } from "./../../../store/slices/auth-slice/auth-service";
import { replaceSpaceWithUnderscore } from "./../../../constants/reusable-functions";

export default function Login() {
  const { loginAsync, loadingAuth, authResponse, userIsLoggedIn, loginMock } =
    useAuthService();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (data) => {
    loginAsync({
      extraInfo: {
        ...schoolInfo,
        className: replaceSpaceWithUnderscore(
          data.graduation_year.toLowerCase()
        ),
      },
      data: { indexNumber: data.index_number, password: data.password },
    });
    console.log(loadingAuth);
    // return;
    // setLoading(true);
    // setTimeout(() => {
    //   navigate(ROUTES.reports.url);
    // }, 3000);
    // mockMode ? loginMock(data) : loginAsync(data)();
  };
  const ejectGraduationYears = () => {
    return GRADUATION_YEARS.map((year, index) => {
      return <option key={index + "options"}>{"Class of " + year}</option>;
    });
  };
  const validationSchema = {
    index_number: {
      required: true,
      maxCharLength: 7,
      minCharLength: 7,
      //   regexPattern: emailRegex(),zz
    },
    password: {
      required: true,
      maxCharLength: 10,
      minCharLength: 10,
    },
    graduation_year: {
      required: true,
      maxCharLength: 30,
      minCharLength: 1,
    },
  };
  const initialValues = {};
  console.log(authResponse);
  return (
    <div className="w-full h-full flex justify-center items-center ">
      <div className="md:w-[80%] md:h-[80%] w-[95%] h-[95%] flex">
        <div className="w-[65%] h-full bg-[#F2F3F3] md:flex justify-center items-center flex-col hidden  ">
          <div className="relative">
            <img
              alt="toukanya logo"
              className="h-[15%]"
              src={images.koinoReportMgr}
            />
            {svgs.loginSvg}
            <div className="absolute top-[300px]">{svgs.ladySvg}</div>
            <div className="absolute top-[300px] right-[40px] animate-rotate">
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
          <h1 className="md:text-3xl text-2xl font-bold">Welcome back!</h1>
          <span className="md:text-xl text-sm">
            Please fill in your credentials to continue
          </span>
          <TFormValidator
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            isSubmitting={loading}
            className="mt-[20px] flex justify-center flex-col "
          >
            {({ errors }) => {
              return (
                <div className="w">
                  <TAuthInput
                    leftIcon={<AlternateEmailOutlined />}
                    label="Index number*"
                    required={true}
                    // regexPattern={emailRegex(5)}
                    minCharLength={7}
                    maxCharLength={7}
                    name="index_number"
                    className="mb-[5px] shadow-neuroInsert border-0 outline-none"
                  />
                  <TAuthInput
                    leftIcon={<LockOutlined />}
                    label="Password*"
                    minCharLength={10}
                    maxCharLength={10}
                    required={true}
                    type="password"
                    name="password"
                    className="shadow-neuroInsert border-0"
                    rightIcon={<RemoveRedEyeOutlined />}
                  />
                  <TSelector
                    placeholder="Select graduation type"
                    label="Graduation year"
                    name="graduation_year"
                    className="bg-[#F5F7F9] border-0"
                  >
                    {ejectGraduationYears()}
                  </TSelector>
                  <TButton
                    styles={{
                      backgroundColor: `${false ? "#38506494" : "#385064"}`,
                    }}
                    className={`max-mt-[40px] mt-[5%]`}
                    icon={<LoginSharp />}
                  >
                    Login
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
