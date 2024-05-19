import React from 'react'
import { AdminOverview, DashboardLayout, GraphOverview, RecordOverview } from '../../components'
import { Styled } from '../../constants/Styled'


const Overview = () => {

  return (
    <div>
        <DashboardLayout>

        <Styled.Section sx="compliance__wrapper">
          {/* <TransaSearch placeholder="Search for anything in overview" />

          <Styled.Wrapper sx="flex justify-center items-center gap-[8px] ">
            <TransaButton sx="overview__export" bg="primary" icon={<Icons.DownloadIcon />} title="Export Data" />
          </Styled.Wrapper> */}
        </Styled.Section>

        <RecordOverview />

        <Styled.Wrapper sx="overview__overview__graph__admin">
          <GraphOverview />
          <AdminOverview />
        </Styled.Wrapper>

        </DashboardLayout>
    </div>
  )
}

export default Overview