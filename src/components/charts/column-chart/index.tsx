"use client";

import Filter from "@/components/filter";
import formatLargeNumber from "@/utils/format-large-number";
import { renderVaultName } from "@/utils/vaults";
import Highcharts from "highcharts";
import { HighchartsReact } from "highcharts-react-official";
import React, { Fragment, useMemo } from "react";

interface Props {
  disableMarker?: boolean;
  data: any[];
  days?: string;
  colors?: string[];
  height?: number;
  bg: string;
  currentFilter?: string;
  setCurrentFilter?: React.Dispatch<React.SetStateAction<string>>;
}

const ColumnChart: React.FC<Props> = ({
  data,
  disableMarker,
  days,
  height,
  bg,
  currentFilter,
  setCurrentFilter,
  colors = ["#49AFE9"],
}) => {
  const formats = useMemo(
    () => [{ value: "24h" }, { value: "7d" }, { value: "30d" }],
    []
  );

  const options = useMemo(
    () => ({
      chart: {
        height: height || 180,
        type: "column",
        backgroundColor: bg,
      },
      title: {
        text: "",
      },
      subtitle: {
        text: "",
      },
      xAxis: {
        labels: {
          enabled: false,
        },
        gridLineColor: "transparent",
        lineColor: "transparent",
        minorTickLength: 0,
        tickLength: 0,
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
      colors: colors,
      tooltip: {
        useHTML: true,
        formatter: function (this: Highcharts.TooltipFormatterContextObject) {
          const { point } = this;
          if (point) {
            return `
                <div style="font-family" class="custom-tooltip">
                ${renderVaultName(this.series.name)}
                  <span class="mt-4">• Vol ${currentFilter}: $${formatLargeNumber(
              point.y
            )}</span>
                </div>
              `;
          }
        },
      },
      plotOptions: {
        column: {
          pointPadding: 0.1,
          borderWidth: 0,
          groupPadding: 0,
          borderRadius: 1,
        },
      },
      legend: {
        enabled: false,
      },
      credits: {
        enabled: false,
      },
      series: data,
    }),
    [height, bg, disableMarker, colors, data, currentFilter]
  );

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

export default ColumnChart;
