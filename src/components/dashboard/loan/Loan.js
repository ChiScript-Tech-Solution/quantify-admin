import React, { useEffect, useState } from "react";
import { Styled } from "../../../constants/Styled";
import { TransaSearch, TransaSort } from "../../../common";
import { Dropdown, Menu, Table } from "antd";
import {  getLoansColumns } from "../../../data/loan.Data";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserLoans } from "../../../state/slice/Loans.Slice";
import { Icons } from "../../../constants/Icons";


const Loan = () => {
  const dispatch = useDispatch();
  const { loans, loading } = useSelector((state) => state.loans);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ pageSize, setPageSize ] = useState(10);
  const [ isSearchQuery, setIsSearchQuery ] = useState("");
 

  useEffect(() => {
    dispatch(
      fetchUserLoans({
        page: currentPage,
        limit: pageSize,
        status: isSearchQuery,

      })
    );
  }, [dispatch, isSearchQuery, currentPage, pageSize]);

  const allLoans = loans?.data?.data;

  // pagination
  const handlePageChange = (page, newPageSize) => {
    setCurrentPage(page);
    setPageSize(newPageSize);
  };



  const renderActionMenu = (customerId) => {
    return (
      <Menu className="actions__keys">
        <Menu.Item key="approved" >
          Approved
        </Menu.Item>
        <Menu.Item key="approved" >
          Reject
        </Menu.Item>
      </Menu>
    );
  };

  const actionColumn = {
    title: "Actions",
    dataIndex: "id",
    key: "id",
    render: (_, record, index) => (
      <Dropdown
        overlay={renderActionMenu(record?.id, index)}
        placement="bottomRight"
        arrow
      >
        <Icons.ActionIcon
          color="#101323"
          size={25}
          onClick={(e) => e.preventDefault()}
        />
      </Dropdown>
    ),
    align: "center",
  };

  const loan_colum = [...getLoansColumns(isSearchQuery), actionColumn];

  return (
    <div>
      <Styled.Wrapper>
        <Styled.Section sx="compliance__wrapper">
          <TransaSearch
            placeholder="Search by ID / Purpose"
            value={isSearchQuery}
            onChange={(e) => setIsSearchQuery(e.target.value)}
          />

          <Styled.Wrapper sx="flex justify-center items-center gap-[8px] ">
  
            <TransaSort name="PDF" />
          </Styled.Wrapper>
        </Styled.Section>

        <Table
          type="primary"
          columns={loan_colum}
          dataSource={allLoans}
          loading={loading}
          rowKey="id"
          rowSelection="checked"
          pagination={{
            total: loans?.data?.total * pageSize,
            pageSize: pageSize,
            current: currentPage,
            showSizeChanger: true,
            onChange: handlePageChange,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} loans`,
            pageSizeOptions: [
              "10",
              "20",
              "30",
              "40",
              "50",
              "60",
              "70",
              "80",
              "100",
            ],
          }}
          className="centered-pagination"
          scroll={{ x: true }}
        />
      </Styled.Wrapper>
    </div>
  );
};

export default Loan;
