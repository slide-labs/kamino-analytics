"use client";

import Filter from "@/components/filter";
import formatLargeNumber from "@/utils/format-large-number";
import { renderVaultName } from "@/utils/vaults";
import Highcharts from "highcharts";
import { HighchartsReact } from "highcharts-react-official";
import React, { Fragment, memo, useMemo } from "react";

interface Props {
  disableMarker?: boolean;
  data: {
    data: {
      name: string;
      data: number[];
    }[];
    strategy: string;
  }[];
  onChangeDays?: (days: string) => void;
  colors?: {
    lineColor: string;
    stops: [number, string][];
  };
  height?: number;
  bg: string;
  currentFilter?: string;
  setCurrentFilter?: React.Dispatch<React.SetStateAction<string>>;
}

const StackedColumnChart: React.FC<Props> = ({
  data,
  currentFilter,
  setCurrentFilter,
  disableMarker,
  height,
  bg,
}) => {
  const formats = useMemo(
    () => [{ value: "24h" }, { value: "7d" }, { value: "30d" }],
    []
  );

  const series = useMemo(() => {
    if (!data) return [];
    let newData;

    data.map(
      (item) =>
        (newData = item.data.map((k) => ({
          name: k.name,
          data: k.data,
        })))
    );

    return newData;
  }, [data]);

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
        min: 0,
        title: {
          text: "",
        },
        labels: {
          style: { color: "#FFFFFF99", fontWeight: "400", fontSize: "12px" },
          enabled: disableMarker ? false : true,
          format: "{text}%",
        },
        tickAmount: 6,
        crosshair: true,
        gridLineDashStyle: "dash",
        gridLineColor: "#FFFFFF14",
      },
      tooltip: {
        useHTML: true,
        shared: true,
        formatter: function (this: Highcharts.TooltipFormatterContextObject) {
          const { points, key }: Highcharts.TooltipFormatterContextObject =
            this;

          if (points && key) {
            let newData: ChartTooltip[] = [];
            points.forEach((item: any) =>
              newData.push({
                name: item.series.name,
                color: item.series.color,
                value: item.point.y,
              })
            );

            const html = `<div class="custom-tooltip !h-[auto] py-4 !w-[240px]">
              <span class="uppercase mb-5">strategy: ${renderVaultName(
                data[Number(key)].strategy
              )}</span>
             ${newData.map((item: any) => {
               return `
                   <div class="flex items-center mb-2 last-of-type:mb-0">
                    <span class="mr-1" style="color: ${item.color}">${
                 item.name
               }:</span>
                    <span>$${formatLargeNumber(item.value)}</span>
                   </div>
                 `;
             })}
           </div>`;

            return html.trim().replaceAll(",", "");
          }
        },
      },
      colors: ["#49AFE9", "#D65463", "#EE8945", "#BB59FF"],
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
      series: series,
    };
  }, [height, bg, disableMarker, series, data]);

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

export default memo(StackedColumnChart);

//
// utils
//

interface ChartTooltip {
  name: string;
  color: string;
  value: number;
}
