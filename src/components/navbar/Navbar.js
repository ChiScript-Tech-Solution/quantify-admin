import React from "react";
import { Styled } from "../../constants/Styled";
import { useLocation } from "react-router-dom";
import { Button, Dropdown, } from "antd";
import { Icons } from "../../constants/Icons";
import { Images } from "../../constants/Images";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../state/slice/Auth.Slice";

const Navbar = () => {
  const location = useLocation();
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const items = [
    {
      label :  (
       <Styled.Span>{user?.refferal_code}</Styled.Span>
      ),
    },

    {
      label :  (
       <Styled.Linked as="/" onClick={() => dispatch(logoutUser())}>Logout</Styled.Linked>
      ),
    }
  ]

  return (
    <Styled.Wrapper sx="navbar__wrapper w-full">
      <Styled.Text sx="navbar__path">
        {location.pathname === "/dashboard/overview"
          ? "Overview"
          : location.pathname === "/dashboard/payment-links"
          ? "Payment Links"
          : location.pathname.split("/")[2]}
      </Styled.Text>

      <Styled.Section sx="navbar__right">
        <Styled.Img img={user?.profileImage ? user?.profileImage : Images.UserImg} alt={user?.full_name} />
        <Dropdown
          menu={{
            items,
          }}
          placement="bottomLeft"
          arrow
        >
          <Button>
            {user?.full_name} <Icons.ChevronDropdown />
          </Button>
        </Dropdown>
      </Styled.Section>
    </Styled.Wrapper>
  );
};

export default Navbar;
