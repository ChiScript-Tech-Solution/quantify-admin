import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { chart_data } from "../../../data/Overview.Data";
import { Styled } from "../../../constants/Styled";
import { TransaDateRange} from "../../../common";

const GraphOverview = () => {
  const formatAmt = (value) => {
    return new Intl.NumberFormat("en-US").format(value);
  };

  return (
    <Styled.Wrapper sx="graph__wrapper">
      <Styled.Text sx="title">Total Revenue</Styled.Text>

      <Styled.Section sx="compliance__wrapper">
        <Styled.Text sx="graph__abr">('000) Abbrevated in millions</Styled.Text>
        <TransaDateRange />
      </Styled.Section>

      <ResponsiveContainer width="100%" height={330}>
        <AreaChart
          data={chart_data}
          syncId="anyId"
          margin={{
            top: 10,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={formatAmt} />
          <Tooltip formatter={(value) => formatAmt(value)} />
          <Area
            type="monotone"
            dataKey="amt"
            stroke="#3B6352"
            strokeWidth={2}
            fill="#7e65b74e"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Styled.Wrapper>
  );
};

export default GraphOverview;
