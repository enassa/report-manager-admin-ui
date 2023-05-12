import React from "react";
import {
  CheckCircleOutlineOutlined,
  InfoOutlined,
  PaidOutlined,
} from "@mui/icons-material";
import GridLayOut from "../../components/grid-layout/GridLayout";
import BillCard from "./../../components/bill-card/BillCard";
import { svgs } from "../../assets/svg/svg";
export default function Bill() {
  const bills = [
    {
      name: "PTA dues - Year Semester 1",
      description: 2,
      total: 2022,
      balance: 100,
    },
    {
      name: "PTA dues - Year Semester 1",
      description: 2,
      total: 2022,
      balance: 100,
    },
    {
      name: "PTA dues - Year Semester 1",
      description: 2,
      total: 2022,
      balance: 100,
    },
    {
      name: "PTA dues - Year Semester 1",
      description: 2,
      total: 2022,
      balance: 100,
    },
    {
      name: "PTA dues - Year Semester 1",
      description: 2,
      total: 2022,
      balance: 100,
    },
    {
      name: "PTA dues - Year Semester 1",
      description: 2,
      total: 2022,
      balance: 100,
    },
    {
      name: "PTA dues - Year Semester 1",
      description: 2,
      total: 2022,
      balance: 100,
    },
    {
      name: "PTA dues - Year Semester 1",
      description: 2,
      total: 2022,
      balance: 100,
    },
    {
      name: "PTA dues - Year Semester 1",
      description: 2,
      total: 2022,
      balance: 100,
    },
    {
      name: "PTA dues - Year Semester 1",
      description: 2,
      total: 2022,
      balance: 100,
    },
  ];
  const ejectBillCards = () => {
    return bills.map((card, index) => {
      return <BillCard data={{ ...card, count: index + 1 }} key={index} />;
    });
  };
  return (
    <div className="w-full h-full flex flex-col bg-">
      {/* <div className="w-full h-[70px] min-h-[40px] flex ">
        <div className="flex h-full w-[100px] items-center flex-col">
          <span className="flex items-center">
            <PaidOutlined style={{ fontSize: 15 }} />
            <span className="ml-[1px]">Total</span>
          </span>
          <span>GHS3000</span>
        </div>
        <div className="flex h-full w-[100px] items-center flex-col text-green-700">
          <span className="flex items-center">
            <PaidOutlined style={{ fontSize: 15 }} />
            <span className="ml-[1px]">Paid</span>
          </span>
          <span>GHS2500</span>
        </div>
        <div className="flex h-full w-[100px] items-center flex-col text-red-600">
          <span className="flex items-center">
            <InfoOutlined style={{ fontSize: 15 }} />
            <span className="ml-[1px]">Outstanding</span>
          </span>
          <span>GHS500</span>
        </div>
      </div> */}

      {/* <GridLayOut
        style={{
          // gridTemplateColumns: `repeat(${small ? "4" : "5"},1fr)`,
          gridTemplateColumns: "repeat(4,1fr)",
          justifyContent: "start",
          padding: 10,
          rowGap: 10,
        }}
      > */}
      {}

      {!bills.length ? (
        <div
          style={{ justifyItems: "center", alignItems: "start" }}
          className="h-full w-full overflow-y-auto   justify-start  pt-3 flex-col pb-[100px] inline-grid  md:grid-cols-4 gap-4 grid-cols-1"
        >
          ejectBillCards()
        </div>
      ) : (
        <div className="flex justify-center items-center w-full h-full flex-col">
          <div className="w-[200px] h-[200px]">{svgs.noData}</div>
          <div>Your bills will soon appear hear!</div>
        </div>
      )}
      {/* </GridLayOut> */}
    </div>
  );
}
