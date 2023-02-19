import React from "react";

export default function BalanceCard({ balance }) {
  return (
    <div className="w-full h-[66px] balance-card text-white p-[5px] px-[10px]">
      <div className="flex justify-start items-center">
        <span className="text-[16px]">Total Balance</span>
      </div>
      <div className="flex justify-start items-center">
        <b className="">${balance ?? 4}</b>
      </div>
    </div>
  );
}
