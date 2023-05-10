// import React from "react";
// import { PaystackButton } from "react-paystack";
// import { END_POINTS } from "../../constants/urls";

// const config = {
//   reference: new Date().getTime().toString(),
//   email: "user@example.com",
//   amount: 200, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
//   publicKey: import.meta.env.VITE_DEV_PS,
//   text: "Make Payment",

//   //           currency="GHS"
//   //           callback={handlePaymentSuccess}
//   //           close={handlePaymentClose}
//   //           disabled={false}
//   //           embed={false}
//   //           reference={`ref-${generateSuperShortId()}`} // Generate a unique reference for each transaction
//   //           email="customer@example.com" // Replace with the customer's email
//   //           amount={50} // Replace with the payment amount in kobo (e.g., 5000 for ₦50.00)
//   //           publicKey={paystackPublicKey}
//   //           tag="button"
// };
// // alert(import.meta.env.VITE_DEV_PS);

// export const ClientPay = () => {
//   // you can call this function anything
//   const handlePaystackSuccessAction = (reference) => {
//     // Implementation for whatever you want to do with reference and after success call.
//     console.log(reference);
//   };

//   // you can call this function anything
//   const handlePaystackCloseAction = () => {
//     // implementation for  whatever you want to do when the Paystack dialog closed.
//     console.log("closed");
//   };

//   const submitPayment = (data) => {
//     fetch(END_POINTS.payWithPayStack, {
//       method: "POST",
//       headers: {
//         // Authorization: `Bearer ${TOKEN.dev}`,
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//       body: !!data ? JSON.stringify(data) : undefined,
//     }).then(async (resp) => {
//       const responseObject = await resp.json();
//       console.log(responseObject);
//     });
//   };
//   const componentProps = {
//     reference: new Date().getTime().toString(),
//     email: "user@example.com",
//     amount: 200, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
//     key: import.meta.env.VITE_DEV_PS,
//     text: "Make Payment",
//     onSuccess: (reference) => handlePaystackSuccessAction(reference),
//     onClose: handlePaystackCloseAction,
//     tag: "button",
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-4">Payment Page</h1>
//       <div className="max-w-sm mx-auto">
//         <button
//           className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
//           onClick={() => {
//             submitPayment(componentProps);
//           }}
//         >
//           PAY
//         </button>
//       </div>
//     </div>
//   );
// };

import React, { useRef, useState } from "react";
import { PaystackButton } from "react-paystack";
import {
  generateSuperShortId,
  getAsObjectFromLocalStorage,
} from "../../constants/reusable-functions";
import { usePaymentService } from "../../store/slices/payment/payement-service";
import { schoolInfo } from "../../constants/ui-data";
import { useAuthService } from "../../store/slices/auth-slice/auth-service";

export const ClientPay = () => {
  const { recordPayment, getTransactions, transactionsList, activeReport } =
    usePaymentService();
  const { userData } = useAuthService();

  console.log(userData);
  const handlePaymentSuccess = (response) => {
    const activeReport = getAsObjectFromLocalStorage("4351activeReport");
    console.log(activeReport);
    recordPayment({
      ...activeReport,
      PayementRef: response?.reference,
      AmountPaid: 5,
      PaymentMode: `Momo_${response.transaction}`,
      Graduation_Year: userData.Graduation_Year,
      ...schoolInfo,
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

  const paystackPublicKey = "pk_test_bc733043a2fa14aaab884ca767c9100508df31f8"; // Replace with your Paystack public key

  return (
    // <div className="container mx-auto px-4 py-8">
    //   <h1 className="text-2xl font-bold mb-4">Payment Page</h1>
    //   <div className="max-w-sm mx-auto">
    <PaystackButton
      text=""
      currency="GHS"
      onSuccess={handlePaymentSuccess}
      onClose={handlePaymentError}
      className="bg-transparent z-[50] pointer-events-auto  m-0 md:min-w-[40px] md:min-h-[40px]  min-w-[32px] min-h-[32px]  text-white font-bold rounded-full"
      // callback={handlePaymentSuccess}
      close={handlePaymentClose}
      disabled={false}
      embed={false}
      reference={() => `ref-${generateSuperShortId()}`} // Generate a unique reference for each transaction
      email="customer@example.com" // Replace with the customer's email
      amount={50} // Replace with the payment amount in kobo (e.g., 5000 for ₦50.00)
      publicKey={paystackPublicKey}
      tag="button"
    />
    //     {paymentStatus && <p className="text-center mt-4">{paymentStatus}</p>}
    //   </div>
    // </div>
  );
};
