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

const LineChart: React.FC<Props> = ({
  isDateActive,
  series,
  disableMarker,
  minValue,
  maxValue,
  days,
  height,
  bg,
  onChangeDays,
  label = "30 Days",
  colors = {
    lineColor: "#49AFE9",
    stops: [
      [0, "#49afe94d"],
      [1, "#49afe908"],
    ],
  },
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
        type: "areaspline",
        backgroundColor: bg,
      },
      title: {
        text: "",
      },
      legend: {
        enabled: false,
      },
      credits: {
        enabled: false,
      },
      xAxis: {
        plotBands: [],
        labels: {
          enabled: false,
        },
        gridLineColor: "transparent",
        lineColor: "transparent",
        minorTickLength: 0,
        tickLength: 0,
      },
      yAxis: {
        title: {
          text: "",
        },
        max: maxValue,
        min: minValue,
        format: "${text}",
        labels: {
          style: { color: "#FFFFFF99", fontWeight: "400", fontSize: "12px" },
          enabled: disableMarker ? false : true
        },
        tickAmount: 7,
        crosshair: true,
        gridLineDashStyle: "dash",
        gridLineColor: "#FFFFFF14",
      },
      tooltip: {
        shared: false,
        valueSuffix: "",
        enabled: true,
      },
      plotOptions: {
        areaspline: {
          lineWidth: 2,
          lineColor: colors.lineColor,
          marker: {
            enabled: false,
          },
          fillOpacity: 0.5,
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1,
            },
            stops: colors.stops
          },
        }
      },
      series: [{ data: series.map((item) => item.total || item.value || 0) }],
    };
  }, [height, bg, maxValue, minValue, disableMarker, colors, series]);

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

export default memo(LineChart);
