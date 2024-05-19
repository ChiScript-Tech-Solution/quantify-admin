import React, { useState } from "react";
import { DatePicker, Select, Space, TimePicker } from "antd";

const { Option } = Select;

const PickerWithType = ({ type, onChange }) => {
  if (type === "time") return <TimePicker size="large" className="transawave__date" onChange={onChange} />;
  if (type === "date") return <DatePicker size="large" className="transawave__date" onChange={onChange} />;
  return <DatePicker size="large" className="transawave__date" picker={type} onChange={onChange}  />;
};

const TransaDateRange = () => {
  const [type, setType] = useState("time");
  return (
    <Space>
      <Select value={type} onChange={setType} size="large" className="transawave__filter" bordered={false}>
        <Option value="time">Time</Option>
        <Option value="date">Date</Option>
        <Option value="week">Week</Option>
        <Option value="month">Month</Option>
        <Option value="quarter">Quarter</Option>
        <Option value="year">Year</Option>
      </Select>
      <PickerWithType size="large"  type={type} onChange={(value) => console.log(value)}  />
    </Space>
  );
};
export default TransaDateRange;
