"use client";

import React, { useEffect, useMemo } from "react";
import CardBase from "@/components/card-base";
import CardBoxCustom from "@/components/card-box-custom";
import Table from "@/components/table";
import { useShareholder } from "@/context/shareholder";
import { useWallet } from "@solana/wallet-adapter-react";
import Link from "next/link";
import { formatTextTransaction } from "@/utils/format-text-transaction";
import { truncateWallet } from "@/utils/truncate";
import moment from "moment";
import formatLargeNumber from "@/utils/format-large-number";

const MyPortfolioTemplate: React.FC = () => {
  const wallet = useWallet();
  const { historyTransactions, fetchHistoryByShareholder, balances } =
    useShareholder();

  useEffect(() => {
    if (!wallet.publicKey) return;

    fetchHistoryByShareholder();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const infoHistoryUser = useMemo(() => {
    return [
      {
        title: "Total Deposit",
        value: "$" + formatLargeNumber(balances.totalDeposit),
      },
      {
        title: "Total Withdraw",
        value: "$" + formatLargeNumber(balances.totalWithdraw),
      },
      {
        title: "Used Vaults",
        value: balances.vaultsUsed,
      },
      {
        title: "Last Deposit",
        value: "$" + formatLargeNumber(balances.lastDeposit),
      },
    ];
  }, [balances]);

  const tableTransactions = useMemo(
    () =>
      historyTransactions?.map((item) => ({
        transactionType: (
          <Link
            target="_blank"
            className="hover:opacity-50 hover:underline text-kamino-blue-light font-medium mr-1 uppercase text-xs"
            href={`https://solscan.io/tx/${item.transactionSignature}`}
            passHref
          >
            {formatTextTransaction(item.transactionName)}
          </Link>
        ),
        amount: (
          <span className="text-xs">
            ${formatLargeNumber(Number(item?.usdValue || 0)) || "-"}
          </span>
        ),
        vault: (
          <span className="text-xs">{item.tokenA + "-" + item.tokenB}</span>
        ),
        strategy: (
          <Link
            target="_blank"
            className="text-kamino-blue-light hover:opacity-50 hover:underline text-xs"
            href={`https://solscan.io/account/${item.strategy}`}
            passHref
          >
            {truncateWallet(item.strategy, 20)}
          </Link>
        ),
        time: (
          <span className="text-xs">
            {moment(item.createdOn).format("DD/MM/YY hh:mmA")}
          </span>
        ),
      })),
    [historyTransactions]
  );

  return (
    <div>
      <h1 className="text-white font-semibold text-[28px] mb-[30px]">
        My Portfolio
      </h1>

      <div className="w-full grid grid-cols-4 gap-x-[12px] mb-3">
        {infoHistoryUser.map((item, index) => (
          <CardBase key={index} data={item} mb={6} textSizeValue={28} />
        ))}
      </div>

      <div className="w-full">
        <h3 className="text-white text-xl mt-8 mb-5">My History</h3>

        <CardBoxCustom className="mb-4" title="">
          <div className="w-full">
            <Table
              head={headerHistory}
              data={tableTransactions}
              loading={false}
            />
          </div>
        </CardBoxCustom>
      </div>
    </div>
  );
};

export default MyPortfolioTemplate;

//
// utils
//

const headerHistory = [
  {
    key: "transactionType",
    hiddenTitle: false,
    title: "Transaction Type",
    width: 30,
  },
  {
    key: "amount",
    hiddenTitle: false,
    title: "Amount usd",
    width: 20,
  },
  {
    key: "vault",
    hiddenTitle: false,
    title: "vault name",
    width: 13,
  },
  {
    key: "strategy",
    hiddenTitle: false,
    title: "strategy",
    width: 20,
  },
  {
    key: "time",
    hiddenTitle: false,
    title: "time",
    width: 17,
  },
];
