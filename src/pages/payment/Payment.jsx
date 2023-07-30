import React, { useEffect, useState } from "react";
import PaymentCard from "../../components/payment-card/PaymentCard";
import { usePaymentService } from "../../store/slices/payment/payement-service";
import { useAuthService } from "../../store/slices/auth-slice/auth-service";
import { svgs } from "../../assets/svg/svg";
import TransactionDetails from "./TransactionDetails";
import ComplainForm from "./ComplainForm";

export default function Payment() {
  const {
    transactionsList,
    raiseComplaint,
    fetchedAllTransactions,
    getTransactionsAsync,
  } = usePaymentService();
  const { userData } = useAuthService();
  useEffect(() => {
    !!userData &&
      !fetchedAllTransactions &&
      getTransactionsAsync({
        Unique_Id: userData?.Unique_Id,
        className: `class_of_${userData?.Graduation_Year}`,
        ...userData,
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
  const [showDetails, setShowDetails] = useState(false);
  const [showComplainForm, setShowComplainForm] = useState(false);
  const ejectTransactions = () => {
    return transactionsList.map((card, index) => {
      return (
        <PaymentCard
          handleOpenDetails={(data) => {
            setShowDetails({
              Payment_Reference: data.PayementRef,
              Amount_Paid: data.AmountPaid,
              Description: data.ActivityDesc,
              Date: data.Date,
            });
          }}
          handleOpenComplainForm={(data) =>
            setShowComplainForm({
              Payment_Reference: data.PayementRef,
              Amount_Paid: data.AmountPaid,
              Description: data.ActivityDesc,
              Date: data.Date,
              Unique_Id: data.Unique_Id,
            })
          }
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
    <div className="h-full relative w-full  overflow-x-hidden overflow-y-auto flex justify-start md:px-[20px] px-[10px] pt-3 flex-col pb-[100px]">
      {transactionsList?.length ? (
        ejectTransactions()
      ) : (
        <div className="flex justify-center items-center w-full h-full flex-col">
          <div className="w-[200px] h-[200px]">{svgs.NoTransaction}</div>
          <div>Your transaction history appears here!</div>
        </div>
      )}
      <div className="h-[30px] min-h-[30px] "></div>
      {!!showDetails && (
        <TransactionDetails
          activeTransaction={showDetails}
          handleClose={() => setShowDetails(null)}
        />
      )}
      {!!showComplainForm && (
        <ComplainForm
          activeTransaction={showComplainForm}
          handleClose={() => setShowComplainForm(null)}
          handleSubmit={(complain) =>
            raiseComplaint({
              Complain: complain,
              ...showComplainForm,
              ...userData,
              DateOfTransaction: showComplainForm.Date,
              ActivityDesc: showComplainForm.Description,
              PayementRef: showComplainForm.Payment_Reference,
              AmountPaid: showComplainForm.Amount_Paid,
            }).finally(() => {
              setShowComplainForm(null);
            })
          }
        />
      )}
    </div>
  );
}
