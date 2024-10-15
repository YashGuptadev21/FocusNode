import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { chartData } from "../assets/data";

const Chart = () => {
  return (
    <div>
      <ResponsiveContainer
      width={"100%"}
      height={500}>
        <BarChart 
        width={150}
        height={40}
        data={chartData}
        ></BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
