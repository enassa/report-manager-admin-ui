import React from "react";
import ReportCard from "../../components/report-card/ReportCard";

export default function Reports() {
  const cards = [
    {
      year: 1,
      semester: 2,
      class: 2022,
      url: "",
    },
    {
      year: 1,
      semester: 2,
      class: 2022,
      url: "",
    },
    {
      year: 1,
      semester: 2,
      class: 2022,
      url: "",
    },
    {
      year: 1,
      semester: 2,
      class: 2022,
      url: "",
    },
    {
      year: 1,
      semester: 2,
      class: 2022,
      url: "",
    },
    {
      year: 1,
      semester: 2,
      class: 2022,
      url: "",
    },
    {
      year: 1,
      semester: 2,
      class: 2022,
      url: "",
    },
    {
      year: 1,
      semester: 2,
      class: 2022,
      url: "",
    },
    {
      year: 1,
      semester: 2,
      class: 2022,
      url: "",
    },
    {
      year: 1,
      semester: 2,
      class: 2022,
      url: "",
    },
    {
      year: 1,
      semester: 2,
      class: 2022,
      url: "",
    },
  ];
  const ejectReportCards = () => {
    return cards.map((card, index) => {
      return <ReportCard data={{ ...card, count: index + 1 }} key={index} />;
    });
  };
  return (
    <div className="h-full w-full flex justify-start px-[20px] pt-3 flex-col pb-[100px]">
      {ejectReportCards()}
      <div className="h-[30px] min-h-[30px] "></div>
    </div>
  );
}
