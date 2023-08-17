"use client";

import Filter from "@/app/components/filter";
import Highcharts from "highcharts";
import { HighchartsReact } from "highcharts-react-official";
import React, { Fragment, useMemo } from "react";

interface Props {
  disableMarker?: boolean;
  series: any[];
  days?: string;
  colors?: string[];
  height?: number;
  bg: string;
  currentFilter?: string;
  setCurrentFilter?: React.Dispatch<React.SetStateAction<string>>;
}

const ColumnChart: React.FC<Props> = ({
  series,
  disableMarker,
  days,
  height,
  bg,
  currentFilter,
  setCurrentFilter,
  colors = ["#49AFE9"],
}) => {
  const formats = useMemo(
    () => [
      { title: "24H", value: "1" },
      { title: "7D", value: "7" },
      { title: "1M", value: "30" },
      { title: "6M", value: "180" },
      { title: "1Y", value: "365" },
      { title: "All", value: "all" },
    ],
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
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        crosshair: true,
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
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat:
          '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
        footerFormat: "</table>",
        shared: true,
        useHTML: true,
      },
      plotOptions: {
        column: {
          pointPadding: 0,
          borderWidth: 0,
          groupPadding: 0.1,
          borderRadius: 1,
        },
      },
      legend: {
        enabled: false,
      },
      credits: {
        enabled: false,
      },
      series: [
        {
          name: "Tokyo",
          data: [
            49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1,
            95.6, 54.4, 148.5, 216.4, 194.1, 95.6, 54.4, 194.1, 95.6, 54.4,
          ],
        },
      ],
    }),
    [bg, colors, disableMarker, height]
  );

  return (
    <Fragment>
      {currentFilter && (
        <div className="absolute right-4 top-6">
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
