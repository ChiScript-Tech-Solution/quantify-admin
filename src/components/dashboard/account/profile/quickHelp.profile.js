import React from "react";
import { Button } from "antd";
import { Styled } from "../../../../constants/Styled";
import { Icons } from "../../../../constants/Icons";


const QuickHelp = () => {
  return (
    <Styled.Form sx="quick__help">
      <Styled.Text>Do you still <br /> need our help?</Styled.Text>


        <Styled.Span sx="quick__desc">Contact our customer service</Styled.Span>


     <Styled.Wrapper sx="quick__help__btn">
         <Button type="primary" size="large" icon={<Icons.EmailIcon />}>Email</Button>
        <Button type="primary" size="large" icon={<Icons.CallIcon />}>Contact Us</Button>
     </Styled.Wrapper>
    </Styled.Form>
  );
};

export default QuickHelp;
