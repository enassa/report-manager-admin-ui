import React, { useEffect, useState } from "react";
import TButton from "../button/Button";
import { Close, Wallet } from "@mui/icons-material";
import TAuthInput from "../auth-input/AuthInput";
import { images } from "../../assets/images/images";
import { PaystackButton } from "react-paystack";
import { generateSuperShortId } from "../../constants/reusable-functions";

export default function SMSSalesBoard({ onClose }) {
  const [amount, setAmount] = useState(0);
  const [cost, setCost] = useState(0);

  useEffect(() => {
    setCost(getCost().toFixed(0));
  }, [amount]);

  const getCost = () => {
    if (amount > 0 && amount < 15) {
      return 0.5;
    }
    switch (amount) {
      case amount <= 300:
        return amount * 0.044;
      case amount > 300 && amount <= 600:
        return amount * 0.031;
      case amount > 600 && amount <= 1700:
        return amount * 0.029;
      case amount > 1700 && amount <= 3700:
        return amount * 0.027;
      case amount > 3700 && amount <= 8000:
        return amount * 0.025;
      case amount > 8000 && amount <= 21739:
        return amount * 0.023;
      case amount > 21739 && amount <= 47619:
        return amount * 0.021;
      case amount > 47619 && amount <= 100000:
        return amount * 0.02;
      case amount > 100000:
        return amount * 0.02;
      default:
        return amount * 0.039;
    }
  };

  const handlePaymentSuccess = (response) => {
    // recordReportSubscription({
    //   Unique_Id: userData.Unique_Id,
    //   Graduation_Year: userData.Graduation_Year,
    //   ServiceName: SERVICE_CODES.reportService,
    //   PayementRef: response?.reference,
    //   AmountPaid: RATE_AMOUNTS.reportService,
    //   UserID: userData._id,
    //   PaymentMode: `Momo_${response.transaction}`,
    //   ...selectedSchool,
    // });
  };

  const handlePaymentError = (error) => {
    // Handle payment error here
  };

  const handlePaymentClose = () => {
    // Handle payment modal closed here
  };

  const myPublicKey =
    import.meta.env.MODE === "development"
      ? import.meta.env.VITE_DEV_M_KEY
      : import.meta.env.VITE_PROD_M_KEY;
  console.log(cost == 0);
  const disabled = cost == 0;
  return (
    <div className="w-full h-full flex fixed top-0 right-0 animte-rise bg-[rgb(0,0,0,0.6)] z-[99999] p-[5%]">
      <div className="w-full h-full flex rounded-md relative animate-rise">
        <div className="w-full h-[50px] bg-blue-900 absolute flex justify-end items-center px-2">
          <div
            onClick={() => onClose()}
            className="w-[30px] cursor-pointer  text-white h-[30px] bg-[rgb(255,255,255,0.3)] rounded-full flex items-center justify-center"
          >
            <Close style={{ fontSize: 20 }} />
          </div>
        </div>
        <div className="w-full  flex bg-white flex-col justify-center items-center ">
          <div className="w-[200px] max-w-[200px] flex-col px-4 min-w-[200px]  flex items-center justify-center  ml-2 mr-2  overflow-hidden">
            <img className="h-[20%]" src={images.message} />
            <span className="w-[80%]">
              Enter the number of people you would want to reach to see the
              price
            </span>
          </div>
          <div className="flex w-[70%] bg-gray-100 items-center text-xl px-4 rounded-full">
            <Wallet />{" "}
            <TAuthInput
              maxCharLength={6}
              minCharLength={1}
              type="number"
              placeholder={"Enter number of recipient"}
              onChange={(e) => {
                //   console.log(value);

                setAmount(e.target.value);
              }}
              className={"min-w-[80%] mt-2"}
            />
          </div>
        </div>
        <div className="w-full h-full flex bg-gray-50 justify-center items-center flex-col">
          <div className="bg-gray-100 text-7xl">GHS {getCost().toFixed(0)}</div>
          {/* <TButton className={"max-w-[200px] min-h-[50px] mt-5 text-xl"}>
            Buy
          </TButton> */}
          <PaystackButton
            currency="GHS"
            onSuccess={handlePaymentSuccess}
            onClose={handlePaymentError}
            // callback={handlePaymentSuccess}
            close={handlePaymentClose}
            disabled={true}
            embed={false}
            reference={() => `ref-${generateSuperShortId()}`} // Generate a unique reference for each transaction
            email="hallowedlabs@gmail.com" // Replace with the customer's email
            amount={`${cost}00`} // Replace with the payment amount in kobo (e.g., 5000 for ₦50.00)
            publicKey={myPublicKey}
            tag="button"
            text="Buy Credits"
            className="px-[30px] mt-4 py-[10px] bg-black hover:bg-gray-800 transition-all shadow-neuroRaise  right-0 text-white rounded-md"
          />
        </div>
      </div>
    </div>
  );
}
