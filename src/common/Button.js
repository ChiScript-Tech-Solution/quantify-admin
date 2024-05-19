import { Button } from "antd";
import React from "react";

const TransaButton = (props) => {
  return (
    <div>
      <Button
        type={props.bg}
        htmlType={props.htmlType}
        icon={props.icon}
        onChange={props.onChange}
        value={props.value}
        onClick={props.onClick}
        disabled={props.disabled}
        className={`font-semibold ${props.width} ${props.sx}`}
        size="large"
        loading={props.loading}
        {...props}
      >
        {props.title || "SME & More"}
      </Button>
    </div>
  );
};

export default TransaButton;
