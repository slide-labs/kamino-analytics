"use client";

import { ibm_mono } from "@/utils/fonts";
import React from "react";

interface Props {
  head: { key: string; hiddenTitle: boolean; title: string; width: number }[];
  data: any[];
  loading?: boolean;
}

const Table: React.FC<Props> = ({ head, data, loading }) => {
  return (
    <div className="flex flex-col w-full z-10">
      <div className="-my-2 overflow-x-auto sm:-mx-6">
        <div className="inline-block min-w-full py-2 align-middle px-0.5 sm:px-2 pb-5">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead>
                <tr>
                  {head.map((item) => (
                    <th
                      style={{ width: `${item.width}%` }}
                      key={item.key}
                      scope="col"
                      className="px-3 py-3.5 text-xs font-semibold text-[#637081] uppercase text-right first-of-type:text-left first-of-type:pl-5 last-of-type:pr-5"
                    >
                      {!item.hiddenTitle && item.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E2536] bg-transparent">
                {loading ? (
                  <>
                    {mockedData.map((_, index) => (
                      <tr key={index} className="h-11 relative">
                        <td>
                          <span className="absolute top-0 w-[98%] ml-4 mt-4 rounded h-4 animate-pulse bg-gray-300 flex" />
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <>
                    {data.map((item, key) => (
                      <tr key={key} className="overflow-auto">
                        {head.map((headItem, index) => (
                          <td
                            style={ibm_mono.style}
                            key={index}
                            className="whitespace-nowrap px-3 py-3 text-white text-[15px] font-medium text-right first-of-type:text-left first-of-type:pl-5 last-of-type:pr-5"
                          >
                            {item[headItem.key]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;

//
// Utils
//

const mockedData = ["", "", "", "", "", "", "", ""];
