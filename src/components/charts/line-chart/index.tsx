"use client";

import Highcharts from "highcharts";
import { HighchartsReact } from "highcharts-react-official";
import React, { Fragment, memo, useMemo } from "react";
import Filter from "@/components/filter";
import moment from "moment";
import formatLargeNumber from "@/utils/format-large-number";

interface Props {
  currentFilter?: string;
  setCurrentFilter?: React.Dispatch<React.SetStateAction<string>>;
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
  currentFilter,
  setCurrentFilter,
  series,
  disableMarker,
  minValue,
  maxValue,
  height,
  bg,
  colors = {
    lineColor: "#49AFE9",
    stops: [
      [0, "#49afe94d"],
      [1, "#49afe908"],
    ],
  },
}) => {
  const formats = useMemo(
    () => [{ value: "24h" }],
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
        labels: {
          style: { color: "#FFFFFF99", fontWeight: "400", fontSize: "12px" },
          enabled: disableMarker ? false : true,
          format: '${text}'
        },
        tickAmount: 7,
        crosshair: true,
        gridLineDashStyle: "dash",
        gridLineColor: "#FFFFFF14",
      },
      tooltip: {
        useHTML: true,
        formatter: function (this: Highcharts.TooltipFormatterContextObject) {
          const { point } = this;
          if (point) {
            const dataIndex = point.index;
            const lineData = series[dataIndex];

            return `
                <div style="font-family" class="custom-tooltip">
                  <div class="flex items-center justify-between mb-1">
                    <span>${moment
                      .unix(lineData.timestamp)
                      .format("DD/MM/YYYY")}</span>

                    <span class="text-kamino-steel-blue">${moment
                      .unix(lineData.timestamp)
                      .format("hh:mm A")}</span>
                  </div>
               
                  <span class="mt-4">• Vol 24h: $${formatLargeNumber(
                    lineData.value
                  )}</span>
                </div>
              `;
          }
        },
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
            stops: colors.stops,
          },
        },
      },
      series: [{ data: series.map((item) => item.value || 0) }],
    };
  }, [
    height,
    bg,
    maxValue,
    minValue,
    disableMarker,
    colors.lineColor,
    colors.stops,
    series,
  ]);

  return (
    <Fragment>
      {currentFilter && (
        <div className="absolute right-3 top-6">
          <Filter
            data={formats}
            currentValue={currentFilter}
            setCurrentValue={setCurrentFilter}
          />
        </div>
      )}
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Fragment>
  );
};

export default memo(LineChart);
