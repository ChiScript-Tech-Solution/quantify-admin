import { Checkbox } from "antd";
import React from "react";

const TransaCheckBox = (props) => {
  return (
    <Checkbox
      value={props.value}
      name={props.name}
      onChange={props.onChange}
      onBlur={props.onBlur}
      {...props}
    >
      {props.title ?? undefined}
    </Checkbox>
  );
};

export default TransaCheckBox;
