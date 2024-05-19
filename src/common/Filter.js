import React from "react";
import { Select } from "antd";
import { Icons } from "../constants/Icons";


const Filter = ({ onChange, defaultValue, options }) => {
  return (
    <Select
      className="transawave__filter"
      onChange={onChange}
      defaultValue={defaultValue}
      suffixIcon={<Icons.FilterIcon />}
      size="large"
      bordered={false}
    >
      {options.map((option) => (
        <Select.Option key={option.value} value={option.value}>
          {option.label}
        </Select.Option>
      ))}
    </Select>
  );
};

export default Filter;
