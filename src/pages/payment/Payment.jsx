import React, { useEffect } from "react";
import PaymentCard from "../../components/payment-card/PaymentCard";
import ReportCard from "../../components/report-card/ReportCard";
import { usePaymentService } from "../../store/slices/payment/payement-service";
import { useAuthService } from "../../store/slices/auth-slice/auth-service";
import { schoolInfo } from "../../constants/ui-data";
import { svgs } from "../../assets/svg/svg";

export default function Payment() {
  const { transactionsList, fetchedAllTransactions, getTransactionsAsync } =
    usePaymentService();
  const { userData } = useAuthService();
  console.log(userData);
  useEffect(() => {
    !!userData &&
      !fetchedAllTransactions &&
      getTransactionsAsync({
        Unique_Id: userData?.Unique_Id,
        className: `class_of_${userData?.Graduation_Year}`,
        ...schoolInfo,
      });
  }, []);
  const cards = [
    {
      bill: "Payment for PTA dues",
      expected: 2,
      paid: 2022,
      date: "30th June 2020 | 10:32AM",
    },
    {
      bill: "Payment for PTA dues",
      expected: 2,
      paid: 2022,
      date: "30th June 2020 | 10:32AM",
    },
    {
      bill: "Payment for PTA dues",
      expected: 2,
      paid: 2022,
      date: "30th June 2020 | 10:32AM",
    },
    {
      bill: "Payment for PTA dues",
      expected: 2,
      paid: 2022,
      date: "30th June 2020 | 10:32AM",
    },
  ];
  const ejectTransactions = () => {
    console.log(transactionsList);
    return transactionsList.map((card, index) => {
      return (
        <PaymentCard
          data={{
            ...card,
            bill: card.ActivityDesc,
            amount: card.AmountPaid,
            date: card.Date,
            count: index + 1,
          }}
          key={index}
        />
      );
    });
  };
  return (
    <div className="h-full w-full overflow-x-hidden overflow-y-auto flex justify-start md:px-[20px] px-[10px] pt-3 flex-col pb-[100px]">
      {transactionsList?.length ? (
        ejectTransactions()
      ) : (
        <div className="flex justify-center items-center w-full h-full flex-col">
          <div className="w-[200px] h-[200px]">{svgs.NoTransaction}</div>
          <div>Your transaction history appears here!</div>
        </div>
      )}
      <div className="h-[30px] min-h-[30px] "></div>
    </div>
  );
}
// import React, { useState } from "react";
// import { PaystackButton } from "react-paystack";
// import { generateSuperShortId } from "../../constants/reusable-functions";

// const Payment = () => {
//   const [paymentStatus, setPaymentStatus] = useState("");

//   const handlePaymentSuccess = (response) => {
//     // Process successful payment here
//     console.log(response);
//     setPaymentStatus("Payment successful!");
//   };

//   const handlePaymentError = (error) => {
//     // Handle payment error here
//     console.error(error);
//     setPaymentStatus("Payment failed. Please try again.");
//   };

//   const handlePaymentClose = () => {
//     // Handle payment modal closed here
//     setPaymentStatus("Payment canceled.");
//   };

//   const paystackPublicKey = "pk_test_bc733043a2fa14aaab884ca767c9100508df31f8"; // Replace with your Paystack public key

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-4">Payment Page</h1>
//       <div className="max-w-sm mx-auto">
//         <PaystackButton
//           text="Make Payment"
//           currency="GHS"
//           className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
//           callback={handlePaymentSuccess}
//           close={handlePaymentClose}
//           disabled={false}
//           embed={false}
//           reference={`ref-${generateSuperShortId()}`} // Generate a unique reference for each transaction
//           email="customer@example.com" // Replace with the customer's email
//           amount={50} // Replace with the payment amount in kobo (e.g., 5000 for ₦50.00)
//           publicKey={paystackPublicKey}
//           tag="button"
//         />
//         {paymentStatus && <p className="text-center mt-4">{paymentStatus}</p>}
//       </div>
//     </div>
//   );
// };

// export default Payment;
