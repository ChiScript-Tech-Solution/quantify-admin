
import React from "react";
import { Input} from "antd";

const CustomInput = ({ isEdit,  name, value, placeholder, onChange, className, disabled, rest }) => {
  return (
    <>
      {isEdit ? (
        <Input size="large" placeholder={placeholder} name={name} value={value} onChange={onChange} disabled={disabled} className={className} {...rest} />
      ) : (
        <Input size="large" placeholder={placeholder} name={name} value={value} onChange={onChange} disabled={disabled} className={className} {...rest} />
      )}
    </>
  );
};

export default CustomInput;
