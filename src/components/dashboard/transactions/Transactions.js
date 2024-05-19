import React, { useEffect, useState } from "react";
import { Styled } from "../../../constants/Styled";
import { TransaSearch, TransaSort } from "../../../common";
import {  Table } from "antd";
import { getTransactionColumns, } from "../../../data/transactions.Data";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserTransactions } from "../../../state/slice/Transactions.Slice";
import { exportToPDF } from "../../../utils/Utils";
// import { Icons } from "../../../constants/Icons";
// import TransactionDetails from "./Transaction.Details";

const Transactions = () => {
  const dispatch = useDispatch();
  const { transactions, loading } = useSelector((state) => state.transactions);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isSearchQuery, setIsSearchQuery] = useState("");
  // const [isFilter, setIsFilter] = useState(null);
  // const [isViewDetails, setIsViewDetails] = useState(false);
  // const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  useEffect(() => {
    dispatch(
      fetchUserTransactions({
        offSet: currentPage,
        limit: pageSize,
        search: isSearchQuery,
      })
    );
  }, [dispatch, isSearchQuery, currentPage, pageSize]);

  const allTransactions = transactions?.data?.transactions;


  const trnx_col = getTransactionColumns(isSearchQuery);

  const handlePageChange = (page, newPageSize) => {
    setCurrentPage(page);
    setPageSize(newPageSize);
  };



  return (
    <div>
      <Styled.Wrapper>
        <Styled.Section sx="compliance__wrapper">
          <TransaSearch
            placeholder="Search by Status"
            value={isSearchQuery}
            onChange={(e) => setIsSearchQuery(e.target.value)}
          />

          <Styled.Wrapper sx="flex justify-center items-center gap-[8px] ">
            {/* <TransaFilter
              onChange={handleFilterChange}
              defaultValue={"filter"}
              options={filteredUserOptions}
            /> */}
            <TransaSort name="PDF" onClick={() => exportToPDF(allTransactions, 'Transactions Report', trnx_col, 'landscape')} />
          </Styled.Wrapper>
        </Styled.Section>

        <Table
          type="primary"
          columns={trnx_col}
          dataSource={allTransactions}
          loading={loading}
          rowKey="id"
          rowSelection="checked"
          pagination={{
            showSizeChanger: true,
            total: transactions?.data?.total * pageSize,
            pageSize: pageSize,
            current: currentPage,
            onChange: handlePageChange,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
          }}
        />
      </Styled.Wrapper>

      {/* {isViewDetails && selectedCustomerId &&
        <Modal
          title="Transaction Details"
          open={isViewDetails}
          footer={null}
          width={400}
          onCancel={handleView}
        >
          <TransactionDetails id={selectedCustomerId} />
        </Modal>} */}
    </div>
  );
};

export default Transactions;
