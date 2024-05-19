import { Input } from "antd";
import React from "react";
import { Icons } from "../constants/Icons";

const Search = (props) => {
  return (
    <>
      <Input
        className="transawave__input"
        prefix={<Icons.SearchIcon />}
        size="large"
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
    </>
  );
};

export default Search;
