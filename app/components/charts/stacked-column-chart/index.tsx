"use client";

import Highcharts from "highcharts";
import { HighchartsReact } from "highcharts-react-official";
import React, { Fragment, memo, useMemo } from "react";
import classNames from "@/app/utils/class-name";

interface Props {
  isDateActive: boolean;
  disableMarker?: boolean;
  series: any[];
  minValue?: number;
  maxValue?: number;
  days?: string;
  onChangeDays?: (days: string) => void;
  colors?: {
    lineColor: string;
    stops: [number, string][];
  };
  label?: string;
  height?: number;
  bg: string;
}

const StackedColumnChart: React.FC<Props> = ({
  isDateActive,
  series,
  disableMarker,
  days,
  height,
  bg,
  onChangeDays
}) => {
  const formats = useMemo(
    () => [
      { title: "24H", value: "1" },
      { title: "7D", value: "7" },
      { title: "14D", value: "14" },
      { title: "30D", value: "30" },
    ],
    []
  );

  const options = useMemo(() => {
    return {
      chart: {
        height: height || 180,
        type: "column",
        backgroundColor: bg,
      },
      title: {
        text: "",
      },
      credits: {
        enabled: false,
      },
      xAxis: {
        categories: [
          "2021/22",
          "2021/22",
          "2021/22",
          "2021/22",
          "2021/22",
          "2021/22",
          "2021/22",
          "2021/22",
          "2021/22",
          "2020/21",
          "2019/20",
          "2018/19",
          "2017/18",
        ],
        plotBands: [],
        gridLineColor: "transparent",
        lineColor: "transparent",
        labels: {
          style: { color: "#98B0C1", fontWeight: "600", fontSize: "12px" },
          enabled: disableMarker ? false : true,
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: "",
        },
        labels: {
          style: { color: "#FFFFFF99", fontWeight: "400", fontSize: "12px" },
          enabled: disableMarker ? false : true,
        },
        tickAmount: 7,
        crosshair: true,
        gridLineDashStyle: "dash",
        gridLineColor: "#FFFFFF14",
      },
      tooltip: {
        pointFormat:
          '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
        shared: true,
      },
      colors: ["#49AFE9", "#D65463", "#EE8945"],
      plotOptions: {
        column: {
          stacking: "percent",
          borderRadius: 1,
          borderWidth: 0,
          dataLabels: {
            enabled: false,
            align: "right",
            format: "{y}",
            style: {
              fontSize: "14px",
              fontWeight: "bold",
              textOutline: "none",
            },
          },
        },
      },
      legend: {
        itemStyle: {
          color: "#FFFFFF",
          fontSize: "13px",
        },
        itemHoverStyle: { color: "#FFFFFF" },
        margin: 20,
        layout: "horizontal",
        align: "left",
        verticalAlign: "bottom",
      },
      series: [
        {
          name: "Kevin De Bruyne",
          data: [4, 4, 2, 4, 4, 4, 4, 4, 4, 4, 4],
        },
        {
          name: "Joshua Kimmich",
          data: [0, 4, 3, 2, 3, 4, 4, 2, 4, 4, 4],
        },
        {
          name: "Sadio Mané",
          data: [1, 2, 2, 1, 2, 0, 4, 3, 2, 3, 4],
        },
      ],
    };
  }, [bg, disableMarker, height]);

  return (
    <Fragment>
      <HighchartsReact highcharts={Highcharts} options={options} />

      {isDateActive && (
        <div className="flex justify-end">
          {formats.map((item, index) => (
            <button
              key={index}
              onClick={() => onChangeDays && onChangeDays(item.value)}
              className={classNames(
                "text-gray-400 border border-white text-xs px-4 py-1 rounded-full font-medium mr-3 hover:bg-gray-300 hover:bg-opacity-30",
                item.value === days && "bg-gray-300 bg-opacity-30"
              )}
            >
              {item.title}
            </button>
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default memo(StackedColumnChart);
