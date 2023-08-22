"use client";

import CardBoxCustom from "@/components/card-box-custom";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import CardBase from "@/components/card-base";
import LineChart from "@/components/charts/line-chart";
import ColumnChart from "@/components/charts/column-chart";
import StackedColumnChart from "@/components/charts/stacked-column-chart";
import Table from "@/components/table";
import Link from "next/link";
import { truncateWallet } from "@/utils/truncate";
import formatLargeNumber from "@/utils/format-large-number";
import { TYPE_PERIOD } from "@/types/strategies";
import { useStrategies } from "@/context/strategies";
import moment from "moment";
import { useDebouncedCallback } from "use-debounce";
import { formatTextTransaction } from "@/utils/format-text-transaction";

const StatsTemplate: React.FC = () => {
  const {
    allTimeFees,
    tvl,
    volPerPeriod,
    historyVolume,
    feesAndRewards,
    allTransactions,
    fetchHistoryVolume,
    fetchAllTimeFees,
    fetchTvl,
    fetchVolume,
    filterVolumeVaults,
    fetchFeesAndRewards,
    fetchTransactions,
  } = useStrategies();
  const [filterVaultUsed, setFilterVaultUsed] = useState("24h");
  const [filterVolume, setFilterVolume] = useState("24h");
  const [filterFeeAndRewards, setFilterFeeAndRewards] = useState("24h");

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

  useEffect(() => {
    fetchFeesAndRewards(filterFeeAndRewards as TYPE_PERIOD);
  }, [filterFeeAndRewards]); // eslint-disable-line react-hooks/exhaustive-deps

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
    const history = filterVolumeVaults(filterVaultUsed as TYPE_PERIOD);

    const chart = history?.map((item) => {
      return {
        name: item.strategy,
        data: [Number(item.kaminoVolume?.amount || 0)],
      };
    });

    return chart;
  }, [filterVaultUsed, filterVolumeVaults]);

  const chartFeesAndRewards = useMemo(() => {
    if (!feesAndRewards) return [];

    const data: { name: string; data: number[] }[] = [
      {
        name: "Total USD",
        data: [],
      },
      {
        name: "Fee Earned",
        data: [],
      },
      {
        name: "Kamino Rewards",
        data: [],
      },
      {
        name: "Rewards Earned",
        data: [],
      },
    ];

    const strategies: string[] = [];

    feesAndRewards.forEach((item) => {
      data[0].data.push(item.totalUsd);
      data[1].data.push(item.feesEarnedUsd);
      data[2].data.push(item.kaminoRewards);
      data[3].data.push(item.rewardsEarnedUsd);
      strategies.push(item.strategy);
    });

    const newDataGroup = strategies.map((strategy) => ({
      data: data,
      strategy: strategy,
    }));

    return newDataGroup;
  }, [feesAndRewards]);

  const data = useMemo(
    () =>
      allTransactions.map((item) => ({
        transactionType: (
          <Link
            target="_blank"
            className="hover:opacity-50 hover:underline text-kamino-blue-light font-medium mr-1 uppercase text-xs"
            href={`https://solscan.io/tx/${item.tx}`}
            passHref
          >
            {formatTextTransaction(item.transactionType)}
          </Link>
        ),
        vault: <span className="text-xs">{item.vaultName || "-"}</span>,
        strategy: (
          <Link
            target="_blank"
            className="text-kamino-blue-light hover:opacity-50 hover:underline text-xs"
            href={`https://solscan.io/account/${item.vaultAddress}`}
            passHref
          >
            {truncateWallet(item.vaultAddress, 26)}
          </Link>
        ),
        time: (
          <span className="text-xs">
            {moment.unix(item.timestamp).fromNow()}
          </span>
        ),
      })),
    [allTransactions]
  );

  return (
    <div>
      <h1 className="text-white font-semibold text-[28px] mb-[30px]">Stats</h1>

      <div className="w-full grid grid-cols-4 gap-x-[12px] mb-3">
        {generalStatsBlock.map((item, index) => (
          <CardBase key={index} data={item} textSizeValue={26} />
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

      <CardBoxCustom className="h-[426px] mb-4" title="Fees and Rewards">
        <div className="w-full overflow-hidden">
          <StackedColumnChart
            bg={"#151C2E"}
            height={340}
            currentFilter={filterFeeAndRewards}
            setCurrentFilter={setFilterFeeAndRewards}
            data={chartFeesAndRewards}
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

      <div className="w-full">
        <h3 className="text-white text-xl mt-8 mb-5">Transactions</h3>

        <CardBoxCustom className="mb-4" title="">
          <div className="w-full">
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
