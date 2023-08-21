"use client";

import CardBoxCustom from "@/components/card-box-custom";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import CardBase from "@/components/card-base";
import LineChart from "@/components/charts/line-chart";
import ColumnChart from "@/components/charts/column-chart";
import StackedColumnChart from "@/components/charts/stacked-column-chart";
// import Filter from "@/components/filter";
import Table from "@/components/table";
import Link from "next/link";
import { truncateWallet } from "@/utils/truncate";
import formatLargeNumber from "@/utils/format-large-number";
import { TYPE_PERIOD } from "@/types/strategies";
import { useStrategies } from "@/context/strategies";
import moment from "moment";
import { useDebouncedCallback } from "use-debounce";

const StatsTemplate: React.FC = () => {
  const {
    allTimeFees,
    tvl,
    volPerPeriod,
    historyVolume,
    allTransactions,
    fetchHistoryVolume,
    fetchAllTimeFees,
    fetchTvl,
    fetchVolume,
    filterVolumeVaults,
    fetchTransactions,
  } = useStrategies();
  const [filterVaultUsed, setFilterVaultUsed] = useState("24h");
  const [filterPools, setFilterPools] = useState("All");
  const [filterTransactions, setFilterTransactions] = useState("All");
  const [filterVolume, setFilterVolume] = useState("24h");

  useEffect(() => {
    fetchTransactions();

    window.addEventListener("scroll", debounced);

    return () => {
      window.removeEventListener("scroll", debounced);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const debounced = useDebouncedCallback((value) => {
    loadMore();
  }, 1000);

  const loadMore = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 100
    ) {
      fetchTransactions(allTransactions[allTransactions.length - 1]?.tx);
    }
  }, [allTransactions, fetchTransactions]);

  useEffect(() => {
    fetchAllTimeFees();
    fetchTvl();
    fetchVolume();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchHistoryVolume(filterVolume as TYPE_PERIOD);
  }, [filterVolume]); // eslint-disable-line react-hooks/exhaustive-deps

  const generalStatsBlock = useMemo(() => {
    return [
      {
        title: "TVL",
        value: "$" + formatLargeNumber(tvl),
      },
      {
        title: "Volume 24H",
        value: "$" + formatLargeNumber(volPerPeriod?.["24h"]?.amount),
      },
      {
        title: "Volume 7D",
        value: "$" + formatLargeNumber(volPerPeriod?.["7d"].amount),
      },
      {
        title: "Total Fees",
        value: "$" + formatLargeNumber(allTimeFees),
      },
      {
        title: "Total Users",
        value: "5.000",
      },
    ];
  }, [allTimeFees, tvl, volPerPeriod]);

  const chartDataVolume = useMemo(() => {
    const chart = historyVolume.map((item) => {
      return {
        timestamp: item.date,
        value: item.volume24hUsd,
      };
    });

    return chart;
  }, [historyVolume]);

  const chartVaultsVolume = useMemo(() => {
    const history = filterVolumeVaults(filterVaultUsed);

    const chart = history?.map((item) => {
      return {
        name: item.strategy,
        data: [Number(item.kaminoVolume?.amount || 0)],
      };
    });

    return chart;
  }, [filterVaultUsed, filterVolumeVaults]);

  const data = useMemo(
    () =>
      allTransactions.map((item) => ({
        transactionType: (
          <Link
            target="_blank"
            className="hover:opacity-50 hover:underline text-purple-300 font-medium mr-1 uppercase"
            href={`https://solscan.io/tx/${item.tx}`}
            passHref
          >
            {item.transactionType}
          </Link>
        ),
        vault: item.vaultName || "-",
        strategy: (
          <Link
            target="_blank"
            className="text-purple-300 hover:opacity-50 hover:underline"
            href={`https://solscan.io/account/${item.vaultAddress}`}
            passHref
          >
            {truncateWallet(item.vaultAddress, 26)}
          </Link>
        ),
        time: moment.unix(item.timestamp).fromNow(),
      })),
    [allTransactions]
  );

  return (
    <div>
      <h1 className="text-white font-semibold text-[28px] mb-[30px]">Stats</h1>

      <div className="w-full grid grid-cols-5 gap-x-[7px] mb-3">
        {generalStatsBlock.map((item, index) => (
          <CardBase key={index} data={item} />
        ))}
      </div>

      <CardBoxCustom className="mb-4 h-[350px]" title="Volume">
        <div className="w-full h-full">
          <LineChart
            bg={"#151C2E"}
            currentFilter={filterVolume}
            setCurrentFilter={setFilterVolume}
            series={chartDataVolume}
            height={250}
          />
        </div>
      </CardBoxCustom>

      {/* <div className="flex items-center mb-4 gap-x-[16px]">
        <CardBoxCustom className="w-1/2 h-[350px]" title="New Users">
          <div className="w-full h-full">
            <LineChart
              bg={"#151C2E"}
              series={chartDataVolume}
              height={250}
              colors={colorsLineUsers as any}
            />
          </div>
        </CardBoxCustom>

        <CardBoxCustom className="w-1/2 h-[350px]" title="Users">
          <div className="w-full h-full">
            <LineChart
              bg={"#151C2E"}
              series={chartDataVolume}
              height={250}
              colors={colorsLineNewUsers as any}
            />
          </div>
        </CardBoxCustom>
      </div> */}

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
            data={chartVaultsVolume || []}
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
            data={[]}
            colors={["#49AFE9"]}
          />
        </div>
      </CardBoxCustom>

      <div className="w-full">
        <h3 className="text-white text-xl mt-8 mb-5">Transactions</h3>

        <CardBoxCustom className="mb-4" title="">
          <div className="w-full">
            {/* <div className="mb-4">
              <Filter
                data={dataFilterTransactions}
                currentValue={filterTransactions}
                setCurrentValue={setFilterTransactions}
              />
            </div> */}
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
    key: "transactionType",
    hiddenTitle: false,
    title: "Transaction Type",
    width: 45,
  },
  {
    key: "vault",
    hiddenTitle: false,
    title: "vault name",
    width: 10,
  },
  {
    key: "strategy",
    hiddenTitle: false,
    title: "strategy",
    width: 15,
  },
  {
    key: "time",
    hiddenTitle: false,
    title: "time",
    width: 15,
  },
];
