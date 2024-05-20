import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import { Styled } from "../../constants/Styled";
import { Icons } from "../../constants/Icons";
import { Images } from "../../constants/Images";

const Sidebar = (props) => {
  const [open, setOpen] = useState(true);

      // to make the sidebar have the collapsed with on a width of 2000px
      useEffect(() => {
        const handleResize = () => {
          setOpen(window.innerWidth > 2000);
        };
        
        handleResize(); 
        
        window.addEventListener("resize", handleResize);
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);

  return (
    <Styled.Wrapper sx="sidebar__new">
      <Styled.Section
        sx={`sidebar__new__side ${open ? "expand" : "collapsed"}`}
      >
        <Icons.ToggleIcon
          sx={`sidebar__new__toggle ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <Styled.Section sx={open ? "sidebar__logo" : "block"}>
          {/* <Icons.Logo3 size="34" /> */}
          <span className="rounded-[50%] border-2 border-black"><img src={Images.Logo} alt="" width={40} height={40}/> </span>
          <Styled.Text sx={!open && "scale-0"}>Quantify</Styled.Text>
        </Styled.Section>

        <Styled.List sx={`sidebar__new__menu__item ${open ? "pt-6" : "pt-3"}`}>
          {props.menuItems.map((menu, i) => (
            <Styled.Linked
              as={menu?.link}
              key={i}
              sx={`group ${
                window.location.pathname === menu.link
                  ? "active"
                  : "sidebar__new__menu__item"
              }`}
            >
              <>{open ? menu.icon : <Styled.Span>{menu?.icon}</Styled.Span>}</>
              <Styled.Span
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                sx={`${!open && " opacity-0 translate-x-28 overflow-hidden"}`}
              >
                {menu?.title}
              </Styled.Span>
              <Styled.Span
                sx={`${open && "hidden"}  drop-shadow-lg 
                            group-hover:px-2 group-hover:py-1 group-hover:left-[5.5rem] group-hover:duration-300 group-hover:w-fit
                            `}
              >
                {menu?.title}
              </Styled.Span>
            </Styled.Linked>
          ))}
        </Styled.List>
      </Styled.Section>
      <Styled.Section
        sx={`sidebar__new__content w-full ${open ? "pl-[15rem]" : "pl-[6rem]"}`}
      >
        <Styled.Card sx="navbar__new__header">
          <Navbar />
        </Styled.Card>
        {props.children}
        <Styled.Text sx="pt-4"></Styled.Text>
      </Styled.Section>
    </Styled.Wrapper>
  );
};
export default Sidebar;
