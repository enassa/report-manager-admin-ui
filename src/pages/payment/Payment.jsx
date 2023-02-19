import React from "react";
import PaymentCard from "../../components/payment-card/PaymentCard";
import ReportCard from "../../components/report-card/ReportCard";

export default function Payment() {
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
  const ejectReportCards = () => {
    return cards.map((card, index) => {
      return <PaymentCard data={{ ...card, count: index + 1 }} key={index} />;
    });
  };
  return (
    <div className="h-full w-full flex justify-start px-[20px] pt-3 flex-col pb-[100px]">
      {ejectReportCards()}
      <div className="h-[30px] min-h-[30px] "></div>
    </div>
  );
}
