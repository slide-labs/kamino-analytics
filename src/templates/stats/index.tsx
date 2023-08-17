"use client";

import CardBoxCustom from "@/components/card-box-custom";
import React, { useMemo, useState } from "react";
// import formatLargeNumber from "@/utils/format-large-number";
import CardBase from "@/components/card-base";
import LineChart from "@/components/charts/line-chart";
import ColumnChart from "@/components/charts/column-chart";
import StackedColumnChart from "@/components/charts/stacked-column-chart";
import Filter from "@/components/filter";
import Table from "@/components/table";
import Link from "next/link";
import { truncateWallet } from "@/utils/truncate";
import formatLargeNumber from "@/utils/format-large-number";

const StatsTemplate: React.FC = () => {
  const [filterVaultUsed, setFilterVaultUsed] = useState("All");
  const [filterPools, setFilterPools] = useState("All");
  const [filterTransactions, setFilterTransactions] = useState("All");

  const generalStats = useMemo(() => {
    return [
      {
        title: "TVL",
        value: "$279.2M",
      },
      {
        title: "Volume 24H",
        value: "$456K",
      },
      {
        title: "Volume 7D",
        value: "$5.25M",
      },
      {
        title: "Total Fees",
        value: "$200K",
      },
      {
        title: "Total Users",
        value: "5.000",
      },
    ];
  }, []);

  const filteredChartVolume = useMemo(() => {
    const chart = historyVolume.map((item: { t: number; v: number }) => {
      return {
        timestamp: item.t,
        value: item.v,
      };
    });

    return chart;
  }, []);

  const data = useMemo(() => {
    return [
      {
        token: (
          <Link href={`/blockchain/transactions/`} passHref>
            <span className="text-purple-300 font-medium mr-1 cursor-pointer hover:underline">
              s
            </span>
          </Link>
        ),
        vault: "SOL-USDC",
        amount: `${formatLargeNumber(100000)} USDC`,
        account: (
          <span className="text-kamino-blue-light">
            {truncateWallet("8dq7DkQY3EC1tpVxUkeFcH8wZtUWMRrh3KNr4wGdSCFa", 10)}
          </span>
        ),
        time: "10 days ago",
      },
      {
        token: (
          <Link href={`/blockchain/transactions/`} passHref>
            <span className="text-purple-300 font-medium mr-1 cursor-pointer hover:underline">
              s
            </span>
          </Link>
        ),
        vault: "SOL-USDC",
        amount: `${formatLargeNumber(100000)} USDC`,
        account: (
          <span className="text-kamino-blue-light">
            {truncateWallet("8dq7DkQY3EC1tpVxUkeFcH8wZtUWMRrh3KNr4wGdSCFa", 10)}
          </span>
        ),
        time: "10 days ago",
      },
    ];
  }, []);

  return (
    <div>
      <h1 className="text-white font-semibold text-[28px] mb-[30px]">Stats</h1>

      <div className="w-full grid grid-cols-5 gap-x-[7px] mb-3">
        {generalStats.map((item, index) => (
          <CardBase key={index} data={item} />
        ))}
      </div>

      <CardBoxCustom className="mb-4 h-[350px]" title="Volume">
        <div className="w-full h-full">
          <LineChart
            bg={"#151C2E"}
            isDateActive={false}
            series={filteredChartVolume}
            height={250}
          />
        </div>
      </CardBoxCustom>

     <div className="flex items-center mb-4 gap-x-[16px]">
        <CardBoxCustom className="w-1/2 h-[350px]" title="New Users">
          <div className="w-full h-full">
            <LineChart
              bg={"#151C2E"}
              isDateActive={false}
              series={filteredChartVolume}
              height={250}
              colors={colorsLineUsers as any}
            />
          </div>
        </CardBoxCustom>

        <CardBoxCustom className="w-1/2 h-[350px]" title="Users">
          <div className="w-full h-full">
            <LineChart
              bg={"#151C2E"}
              isDateActive={false}
              series={filteredChartVolume}
              height={250}
              colors={colorsLineNewUsers as any}
            />
          </div>
        </CardBoxCustom>
      </div>

      <CardBoxCustom className="h-[426px] mb-4" title="Fees">
        <div className="w-full overflow-hidden">
          <StackedColumnChart
            bg={"#151C2E"}
            height={340}
            isDateActive={false}
            series={[]}
          />
        </div>
      </CardBoxCustom>

      <CardBoxCustom className="h-[364px] mb-4" title="Most Vault Used">
        <div className="w-full">
          <ColumnChart
            bg={"#151C2E"}
            height={261}
            currentFilter={filterVaultUsed}
            setCurrentFilter={setFilterVaultUsed}
            series={[]}
            colors={["#8CE8BF"]}
          />
        </div>
      </CardBoxCustom>

      <CardBoxCustom className="h-[364px] mb-4" title="All Pools">
        <div className="w-full">
          <ColumnChart
            bg={"#151C2E"}
            height={261}
            currentFilter={filterPools}
            setCurrentFilter={setFilterPools}
            series={[]}
            colors={["#49AFE9"]}
          />
        </div>
      </CardBoxCustom>

      <div className="w-full">
        <h3 className="text-white text-xl mt-8 mb-5">Transactions</h3>

        <CardBoxCustom className="mb-4" title="">
          <div className="w-full">
            <div className="mb-4">
              <Filter
                data={dataFilterTransactions}
                currentValue={filterTransactions}
                setCurrentValue={setFilterTransactions}
              />
            </div>
            <Table
              head={headerTransactions}
              data={data as any}
              loading={false}
            />
          </div>
        </CardBoxCustom>
      </div> 
    </div>
  );
};

export default StatsTemplate;

//
// utils
//

const historyVolume = [
  { t: 1678933085, v: 200000 },

  { t: 1679071598, v: 300000 },

  { t: 1679315636, v: 500000 },

  { t: 1679414755, v: 200000 },

  { t: 1680173515, v: 350000 },

  { t: 1680193016, v: 450000 },

  { t: 1680314156, v: 650000 },

  { t: 1680373788, v: 850000 },

  { t: 1680394280, v: 550000 },

  { t: 1680707389, v: 300000 },

  { t: 1681503408, v: 760000 },

  { t: 1684967324, v: 990000 },
];

const colorsLineUsers = {
  lineColor: "#49AFE9",
  stops: [[0, "transparent"]],
};

const colorsLineNewUsers = {
  lineColor: "#EE8945",
  stops: [[0, "transparent"]],
};

const dataFilterTransactions = [
  { title: "All", value: "all" },
  { title: "Deposit", value: "deposit" },
  { title: "Withdraw", value: "withdraw" },
];

const headerTransactions = [
  {
    key: "token",
    hiddenTitle: false,
    title: "token",
    width: 45,
  },
  {
    key: "vault",
    hiddenTitle: false,
    title: "vault name",
    width: 10,
  },
  {
    key: "amount",
    hiddenTitle: false,
    title: "token amount",
    width: 15,
  },
  {
    key: "account",
    hiddenTitle: false,
    title: "account",
    width: 15,
  },
  {
    key: "time",
    hiddenTitle: false,
    title: "time",
    width: 15,
  },
];
