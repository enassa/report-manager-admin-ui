import React, { useRef, useState } from "react";
import {
  WatchLaterOutlined,
  InfoOutlined,
  Assessment,
  AccountBalanceWallet,
  Timelapse,
} from "@mui/icons-material";
import { ClickAwayListener, Tooltip } from "@mui/material";
import {
  generateSuperShortId,
  getAsObjectFromLocalStorage,
  getLightRGBColor,
} from "../../constants/reusable-functions";
import { PaystackButton } from "react-paystack";
import { usePaymentService } from "../../store/slices/payment/payement-service";
import { useAuthService } from "../../store/slices/auth-slice/auth-service";
import {
  RATE_AMOUNTS,
  SCHOOL_INFO,
  SERVICE_CODES,
  verifyServiceAccess,
} from "../../constants/ui-data";
import { useNavigate } from "react-router-dom";
import { useActivityService } from "../../store/slices/activity-slice/activity-service";

export default function AppCard({ data, color, backgroundImage }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const navigate = useNavigate();
  const { recordReportSubscription, launchService } = usePaymentService();

  const { recordInActiveClick } = useActivityService();
  const { userData, subscriptions } = useAuthService();

  // console.log(userData);

  const handlePaymentSuccess = (response) => {
    // const activeReport = getAsObjectFromLocalStorage("4351activeReport");
    console.log(response, userData);
    recordReportSubscription({
      Unique_Id: userData.Unique_Id,
      Graduation_Year: userData.Graduation_Year,
      ServiceName: SERVICE_CODES.reportService,
      PayementRef: response?.reference,
      AmountPaid: RATE_AMOUNTS.reportService,
      UserID: userData._id,
      PaymentMode: `Momo_${response.transaction}`,
      ...SCHOOL_INFO,
    });
    // setPaymentStatus("Payment successful!");
  };

  const handlePaymentError = (error) => {
    // Handle payment error here
    console.error(error);
  };

  const handlePaymentClose = () => {
    // Handle payment modal closed here
  };
  console.log(subscriptions);

  const paystackPublicKey = "pk_test_bc733043a2fa14aaab884ca767c9100508df31f8"; // Replace with your Paystack public key
  const isSubScripedObj =
    !!subscriptions &&
    subscriptions?.find(
      (subscription) => subscription?.ServiceName === data?.serviceCode
    );
  // console.log(subscriptions[0].ServiceName);
  const activelySubscribed = data.free ? true : !!isSubScripedObj?.CreditsLeft;
  const handleLaunchClick = () => {
    if (!data.active) {
      recordInActiveClick(
        {
          serviceCode: data.serviceCode,
          Unique_Id: userData.Unique_Id,
          ...SCHOOL_INFO,
        },
        data.url
      );
      return;
    }
    if (data.free || verifyServiceAccess(data.serviceCode)) {
      navigate(data.url);
      return;
    }
    launchService({ ...isSubScripedObj, ...SCHOOL_INFO }, data.url);
  };
  return (
    <div
      onClick={() => (data.free || activelySubscribed) && handleLaunchClick()}
      style={{ borderBottomColor: data.color, color: data.color }}
      className="flex border-b-2 relative  shadow-neuroRaise flex-col h-[150px] items-center mb-[5px] rounded-md overflow-hidden md:w-[360px] w-[93%] cursor-pointer transition-all"
    >
      <div
        style={{ backgroundImage: `url(${data.image})` }}
        className="w-full h-full absolute top-0 right-0"
      ></div>
      <div
        className={`  w-full md:h-[200px] bg-[rgb(255,255,255,0.9)]  md:min-h-[150px] min-h-[150px] h-[80px] shadow-md  p-2 flex flex-col relative
           `}
      >
        <Tooltip
          title={data.description}
          open={showTooltip}
          onOpen={() => setShowTooltip(true)}
          onClose={() => setShowTooltip(false)}
        >
          <InfoOutlined
            style={{ fontSize: 19, color }}
            className="absolute right-2 top-2 cursor-pointer"
            onClick={() => setShowTooltip(!showTooltip)}
          />
        </Tooltip>

        <div className="h-full flex justify-start items-center  rounded-2xl ">
          <span
            style={{ backgroundColor: getLightRGBColor(data.color, 0.2) }}
            className="h-[30px] w-[30px] bg-[rgb(255,255,255,0.5)] rounded mr-[10px]"
          >
            <Assessment style={{ fontSize: 35 }} />
          </span>
          <span className="text-2xl text-left text-gray-700 text-xl">
            {data.name}
          </span>
        </div>
        <div className="w-full h-[30px] min-h-[30px] text-whites  text-xs flex items-end">
          {activelySubscribed && !data.free && (
            <span className="flex items-center w-full">
              <Timelapse style={{ fontSize: 15 }} />
              <span className="h-full items-center flex text-2xl">
                {isSubScripedObj?.CreditsLeft}
              </span>
            </span>
          )}
          <div className="w-[350px] h-[20px] flex items-center">
            {activelySubscribed || data.free ? (
              <button
                onClick={() => handleLaunchClick()}
                style={{
                  borderRadius: "20px 20px 20px 20px",
                }}
                className="px-[30px] mb-5 mr-2 py-[10px] bg-gray-600 absolute right-0 text-white rounded-md"
              >
                {activelySubscribed || data.free ? "Launch" : "Subscibe"}
              </button>
            ) : (
              <PaystackButton
                currency="GHS"
                onSuccess={handlePaymentSuccess}
                onClose={handlePaymentError}
                // callback={handlePaymentSuccess}
                close={handlePaymentClose}
                disabled={false}
                embed={false}
                reference={() => `ref-${generateSuperShortId()}`} // Generate a unique reference for each transaction
                email="customer@example.com" // Replace with the customer's email
                amount={`${RATE_AMOUNTS.reportService}00`} // Replace with the payment amount in kobo (e.g., 5000 for ₦50.00)
                publicKey={paystackPublicKey}
                tag="button"
                text="Subscribe"
                className="px-[30px] mb-5 mr-2 py-[10px] bg-gray-600 absolute right-0 text-white rounded-md"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
