// import React from "react";

// export default function AppsList() {
//     const apps =
//   return <div className="">AppsList</div>;
// }

import React from "react";
import {
  Article,
  Assessment,
  CheckCircleOutlineOutlined,
  InfoOutlined,
  PaidOutlined,
} from "@mui/icons-material";
import GridLayOut from "../../components/grid-layout/GridLayout";
import BillCard from "./../../components/bill-card/BillCard";
import { svgs } from "../../assets/svg/svg";
import AppCard from "../../components/app-card/AppCard";
import { images } from "../../assets/images/images";
import { SERVICE_CODES } from "../../constants/ui-data";
import { ROUTES } from "../../constants/route-links";
export default function AppsList() {
  const bills = [
    {
      name: "Check Report",
      description: "Access your wards report cards",
      free: false,
      balance: 100,
      image: images.report,
      icon: <Assessment style={{ backgroundColor: "rgb(255, 107, 107)" }} />,
      color: "rgb(255, 107, 107)",
      serviceCode: SERVICE_CODES.reportService,
      url: ROUTES.reports.url,
      active: true,
    },
    {
      name: "Request Documents",
      description:
        "Request for documents for your ward or yourself eg. Transcripts",
      free: true,
      balance: 100,
      image: images.documents,
      icon: <Article style={{ backgroundColor: "rgb(84, 160, 255)" }} />,
      color: "rgb(84, 160, 255)",
      serviceCode: SERVICE_CODES.documentRequest,
      url: ROUTES.documentRequest.url,
      active: false,
    },
    {
      name: "Student Super Market",
      description: "Buy and deliver items to your ward",
      free: true,
      balance: 100,
      image: images.market,
      icon: <Assessment style={{ backgroundColor: "rgb(95, 39, 205)" }} />,
      color: "rgb(95, 39, 205)",
      serviceCode: SERVICE_CODES.superMarket,
      url: ROUTES.superMarket.url,
      active: false,
    },
    {
      name: "Send money to your ward",
      description: "Send money to your ward from the comfort of your home",
      free: true,
      balance: 100,
      image: images.moneyTostudent,
      icon: <Assessment style={{ backgroundColor: "rgb(0, 210, 211)" }} />,
      color: "rgb(0, 210, 211)",
      serviceCode: SERVICE_CODES.superMarket,
      url: ROUTES.sendMoney.url,
      active: false,
    },
  ];
  //   const colors = ["rgb(0, 210, 211)", "rgb(87, 88, 187)"];

  const ejectAppCards = () => {
    return bills.map((card, index) => {
      return <AppCard data={{ ...card, count: index + 1 }} key={index} />;
    });
  };
  return (
    <div className="w-full h-full flex flex-col animate-rise">
      {bills.length ? (
        <div
          style={{ justifyItems: "center", alignItems: "start" }}
          className="h-full w-full overflow-y-auto overflow-x-hidden  justify-start  pt-3 flex-col pb-[100px] inline-grid sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-3 xlg:grid-cols-4 gap-4 grid-cols-1"
        >
          {ejectAppCards()}
        </div>
      ) : (
        <div className="flex justify-center items-center w-full h-full flex-col">
          <div className="w-[200px] h-[200px]">{svgs.noData}</div>
          <div>Your bills will soon appear hear!</div>
        </div>
      )}
    </div>
  );
}
