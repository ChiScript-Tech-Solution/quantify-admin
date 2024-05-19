import React, { useState } from 'react'
import { DashboardLayout } from '../../components'
import { Tabs } from 'antd'
import { options } from '../../data/settingOption'
import { useSelector } from 'react-redux'

const Settings = () => {
  const [ switchTab, setSwitchTab ] = useState("1")
  const { user } = useSelector((state) => state.auth);

  const handleTabChange = (key) => {
    setSwitchTab(key);
  }
  

  const filteredOptions = user?.is_admin === false 
  ? options
  : options.filter(option => option.key === 1);

  
  return (
    <DashboardLayout>
          <Tabs
          defaultActiveKey={switchTab}
          items={filteredOptions}
          onChange={handleTabChange}
          centered={false}
          className="pt-[20px]"
        />
    </DashboardLayout>
  )
}

export default Settings
