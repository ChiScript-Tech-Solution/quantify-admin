import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllAuditLog } from "../../../state/slice/auditLog.Slice"
import { getAuditLogsColumns } from '../../../data/auditLog.Data';
import { Styled } from '../../../constants/Styled';
import { TransaSearch, TransaSort } from '../../../common';
import { exportToPDF } from '../../../utils/Utils';


const AuditLog = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isSearchQuery, setIsSearchQuery] = useState("");
  const { auditLog, loading } = useSelector((state) => state.auditLog);


  const allLogs = auditLog?.data?.innvestments;

  useEffect(() => {
    dispatch(fetchAllAuditLog({
        page: currentPage,
        limit: pageSize,
        search: isSearchQuery,
    }));
  }, [dispatch, isSearchQuery, currentPage, pageSize]);


  // handle pagination
  const handlePageChange = (page, newPageSize) => {
    setCurrentPage(page);
    setPageSize(newPageSize);
  };

  const audit_col = getAuditLogsColumns(isSearchQuery)

  return (
    <div>
      <Styled.Wrapper>
        <Styled.Section sx="compliance__wrapper">
          <TransaSearch
            placeholder="Search by Date (YYYY-MM-DD)"
            value={isSearchQuery}
            onChange={(e) => setIsSearchQuery(e.target.value)}
          />

          <Styled.Wrapper sx="flex justify-center items-center gap-[8px] ">
          <TransaSort name="PDF" onClick={() => exportToPDF(allLogs, 'Audit Log Report', audit_col)} />
          </Styled.Wrapper>
        </Styled.Section>

      </Styled.Wrapper>

      <Table
        columns={audit_col}
        dataSource={allLogs}
        loading={loading}
        rowKey="id"
        rowSelection="checked"
        pagination={{
          total: auditLog?.data?.pagination?.totalPage * pageSize,
          pageSize: pageSize,
          current: currentPage,
          showSizeChanger: true,
          onChange: handlePageChange,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} logs`,
          pageSizeOptions: ["10","20", "50","70","100",
          ],
        }}
        className="centered-pagination"
        scroll={{ x: true }}
      />
    </div>
  )
}

export default AuditLog