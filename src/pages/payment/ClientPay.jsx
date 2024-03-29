import React from "react";
import { PaystackButton } from "react-paystack";
import {
  generateSuperShortId,
  getAsObjectFromLocalStorage,
} from "../../constants/reusable-functions";
import { usePaymentService } from "../../store/slices/payment/payement-service";
import { LOCAL_STORAGE_KEYS, RATE_AMOUNTS } from "../../constants/ui-data";
import { useAuthService } from "../../store/slices/auth-slice/auth-service";

export const ClientPay = () => {
  const { recordReportPayment, activeReport } = usePaymentService();
  const { userData } = useAuthService();

  const handlePaymentSuccess = (response) => {
    const activeReport = getAsObjectFromLocalStorage(
      LOCAL_STORAGE_KEYS.activeReport
    );
    console.log(activeReport);
    recordReportPayment({
      ...activeReport,
      ActivityDesc: "Excess dowloads fee",
      PayementRef: response?.reference,
      AmountPaid: RATE_AMOUNTS.downloadReport,
      PaymentMode: `Momo_${response.transaction}`,
      Graduation_Year: userData.Graduation_Year,
      ...userData,
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
      amount={`${RATE_AMOUNTS.downloadReport}00`} // Replace with the payment amount in kobo (e.g., 5000 for ₦50.00)
      publicKey={paystackPublicKey}
      tag="button"
    />
    //     {paymentStatus && <p className="text-center mt-4">{paymentStatus}</p>}
    //   </div>
    // </div>
  );
};
