import React, { useEffect, useState } from "react";
import { Styled } from "../../../constants/Styled";
import { TransaSearch, TransaSort } from "../../../common";
import { Dropdown, Menu, Table } from "antd";
import {  getLoansColumns } from "../../../data/loan.Data";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserLoans } from "../../../state/slice/Loans.Slice";
import { Icons } from "../../../constants/Icons";
import { toast } from "react-toastify";
import { approveUserWithdrawal } from "../../../state/slice/approveRejectLoans.Slice"
import { removeUserDelux } from "../../../state/slice/removeDelux.Slice";


const Loan = () => {
  const dispatch = useDispatch();
  const { loans, loading } = useSelector((state) => state.loans);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ pageSize, setPageSize ] = useState(10);
  const [ isSearchQuery, setIsSearchQuery ] = useState("");
  const [ isLoading, setIsLoading ] = useState(false);
  const [isRejecting, setIsRejecting ] = useState(false);
 

  useEffect(() => {
    dispatch(
      fetchUserLoans({
        page: currentPage,
        limit: pageSize,
        status: isSearchQuery,

      })
    );
  }, [dispatch, isSearchQuery, currentPage, pageSize]);

  const allLoans = loans?.data?.fundingRequest;

  // pagination
  const handlePageChange = (page, newPageSize) => {
    setCurrentPage(page);
    setPageSize(newPageSize);
  };

  const handleApproved = async (referenceId) => {
    setIsLoading(true);
    const payload = {
      reference: referenceId,
      status: 'APPROVED'
    }
    try {
      const res = await dispatch(approveUserWithdrawal(payload)).unwrap();
      setIsLoading(false);
      toast.success(res.message)
      dispatch(
        fetchUserLoans({
          page: currentPage,
          limit: pageSize,
          status: isSearchQuery,
  
        })
      );
    } catch (err) {
      setIsLoading(false);
      toast.error(err?.data?.message ||  err.message)
    } finally {
      setIsLoading(false);
    }
}

const handleReject= async (customerId) => {
  setIsRejecting(true);
  const payload = {
    reference: customerId,
    status: 'REJECTED',
  }
  try {
    const res = await dispatch(removeUserDelux(payload)).unwrap();
    setIsRejecting(false);
    toast.success(res.message)
    dispatch(
      fetchUserLoans({
        page: currentPage,
        limit: pageSize,
        status: isSearchQuery,

      })
    );
  } catch (err) {
    setIsRejecting(false);
    toast.error(err?.data?.message ||  err.message)
  } finally {
    setIsRejecting(false);
  }
}


  const renderActionMenu = (customerId) => {
    return (
      <Menu className="actions__keys">
        <Menu.Item key="approved" onClick={() => handleApproved(customerId)}>
            {isLoading ? "Processing..." : "Approved"}
        </Menu.Item>
        <Menu.Item key="approved" onClick={() => handleReject(customerId)}>
          {isRejecting ? "Processing..." : "Reject"}
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
        overlay={renderActionMenu(record?.reference, index)}
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
