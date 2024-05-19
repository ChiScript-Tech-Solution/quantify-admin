import React from 'react';
import Sidebar from '../sidebar/Sidebar';
import { menuItems } from "../../data/Data";



const MainLayout = (props) => {

  return (
    <>
      <Sidebar menuItems={menuItems}>
          {props.children}
      </Sidebar>
    </>
  );
};

export default MainLayout