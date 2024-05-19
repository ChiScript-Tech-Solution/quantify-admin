import { Drawer } from "antd";
import React from "react";

const TransaDrawer = (props) => {
  return (
    <>
      <Drawer
        title={props.title}
        closable={props.closable}
        onClose={props.onclose}
        open={props.open}
        width={props.width}
        bodyStyle={{
          borderRadius: "0px",
        }}
        className="transawave__drawer"
      >
        {props.children}
      </Drawer>
    </>
  );
};

export default TransaDrawer;
