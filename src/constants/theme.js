import React from 'react';
import { ConfigProvider } from 'antd';

const ThemeConfig = ({ children}) => {
  return (
    <ConfigProvider
    theme={{
        token: {
            colorPrimary: "#3B6352",
            colorPrimaryBg: "#f4f4f4",
            colorBorder: "#3B6352",
            colorPrimaryBgHover: "none",
            colorPrimaryBorderHover: "none",
            colorBorderBg: "none",
            boxShadow: "none",
            colorBgLayout: "transparent",      
        }
      }}
  >
    {children}
  </ConfigProvider>
  )
}

export default ThemeConfig