import React, { useEffect } from "react";
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
import { Navigate, useNavigate } from "react-router-dom";
import {
  ADMIN_BASE_URL,
  GRADUATION_YEARS,
  LOCAL_STORAGE_KEYS,
} from "./../../../constants/ui-data";
import { useAuthService } from "./../../../store/slices/auth-slice/auth-service";
import { API } from "../../../App";
import { ROUTES } from "./../../../constants/route-links";
import { getAsObjectFromLocalStorage } from "../../../constants/reusable-functions";

export default function Login() {
  const { loginAsync, loadingAuth, authResponse, selectedSchool } =
    useAuthService();

  const handleSubmit = (data) => {
    loginAsync({ ...data, ...selectedSchool });
  };
  const naigate = useNavigate();

  const validationSchema = {
    password: {
      required: true,
    },
    adminId: {
      required: true,
    },
  };

  useEffect(() => {
    API.setBaseURL(ADMIN_BASE_URL);
  }, []);

  const loginNotAccesible =
    !selectedSchool &&
    !getAsObjectFromLocalStorage(LOCAL_STORAGE_KEYS.selectedSchool);

  const initialValues = {};
  return loginNotAccesible ? (
    <Navigate to={ROUTES.base.url} />
  ) : (
    <div className="w-full h-full flex justify-center items-center ">
      <div className="md:w-[80%] md:h-[80%] w-[95%] h-[95%] flex">
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
          <h1 className="md:text-3xl text-2xl font-bold">Welcome back!</h1>
          <span className="md:text-xl text-sm">
            Please fill in your credentials to continue
          </span>
          <TFormValidator
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            isSubmitting={loadingAuth}
            className="mt-[20px] flex justify-center flex-col "
          >
            {({ errors }) => {
              // console.log(errors);
              return (
                <div className="w">
                  <TAuthInput
                    leftIcon={<AlternateEmailOutlined />}
                    label="Admin Id"
                    required={true}
                    // regexPattern={emailRegex(5)}
                    // minCharLength={7}
                    // maxCharLength={7}
                    name="adminId"
                    className="mb-[5px] shadow-neuroInsert border-0 outline-none"
                  />

                  <TAuthInput
                    leftIcon={<LockOutlined />}
                    label="Password*"
                    // minCharLength={10}
                    // maxCharLength={10}
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
