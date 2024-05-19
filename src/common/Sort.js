import React from "react";
import { Styled } from "../constants/Styled";
import { Icons } from "../constants/Icons";

const Sort = (props) => {
  return (
    <>
      <Styled.Text sx="transawave__sort" onClick={props.onClick}>
        {props.name} <Icons.SortIcon />
      </Styled.Text>
    </>
  );
};

export default Sort;
