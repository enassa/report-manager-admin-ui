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
} from "@mui/icons-material";
import { ROUTES } from "../../../constants/route-links";
import { useNavigate } from "react-router-dom";
import { Routes } from "react-router";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleSubmit = (data) => {
    setLoading(true);
    setTimeout(() => {
      navigate(ROUTES.reports.url);
    }, 3000);
    // mockMode ? loginMock(data) : loginAsync(data)();
  };

  const validationSchema = {
    email: {
      required: true,
      maxCharLength: 30,
      minCharLength: 3,
      //   regexPattern: emailRegex(),
    },
    password: {
      required: true,
      maxCharLength: 40,
      minCharLength: 6,
    },
  };
  const initialValues = {};
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
        <div className="w-full md:w-[35%] h-full bg-transparent bg-[#F2F3F3] animate-rise md:p-[30px] p-[10px]  flex justify-center flex-col shadow-neuroInsert rounded-lg overflow-hidden">
          <span
            onClick={() => navigate(ROUTES.dashboard.url)}
            className="text-blue-600"
          >
            Dashboard
          </span>
          <div className="w-full absolute top-0 left-0  h-[5px]">
            {loading && <SlimLoader />}
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
            className="mt-[20px] flex justify-center flex-col"
          >
            {({ errors }) => {
              return (
                <div className="w">
                  <TAuthInput
                    leftIcon={<AlternateEmailOutlined />}
                    label="Index number*"
                    // regexPattern={emailRegex(5)}
                    minCharLength={5}
                    name="email"
                    className="mb-[5px] shadow-neuroInsert border-0"
                  />
                  <TAuthInput
                    leftIcon={<LockOutlined />}
                    label="Password*"
                    minCharLength={5}
                    required={false}
                    type="password"
                    name="password"
                    className="shadow-neuroInsert border-0"
                    rightIcon={<RemoveRedEyeOutlined />}
                  />
                  <TButton
                    styles={{
                      backgroundColor: `${false ? "#38506494" : "#385064"}`,
                    }}
                    className={`mt-[40px] `}
                    icon={<LoginSharp />}
                    // onClick={() => {
                    //   setLoading(true);
                    //   setTimeout(() => {
                    //     navigate(ROUTES.reports.url);
                    //   }, 1000);
                    // }}
                  >
                    Login
                  </TButton>
                  {/* <div className="w-full mt-[20px] h-[5px]">
                    {authResponse?.message !== undefined &&
                      authResponse.page === "login" &&
                      !loadingAuth && (
                        <div className="w-full  bottom-[10%] right-0 flex  justify-center items-center text-red-400 animate-rise">
                          <Error className="text-red-400 mr-2" />{" "}
                          {authResponse?.message}.
                        </div>
                      )}
                  </div> */}
                </div>
              );
            }}
          </TFormValidator>
        </div>
      </div>
    </div>
  );
}
