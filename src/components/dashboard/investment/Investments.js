import React, { useEffect, useState } from "react";
import { Styled } from "../../../constants/Styled";
import { TransaSearch, TransaSort } from "../../../common";
import { Button, Dropdown, Menu, Modal, Table } from "antd";
import { GetInvestmentColumns } from "../../../data/Investment.Data";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllInvestments } from "../../../state/slice/Investments.Slice";
import { exportToExcel, exportToPDF } from "../../../utils/Utils";
import { Icons } from "../../../constants/Icons";
import AddAddress from "./Add_Address";
import { toast } from "react-toastify";
import { ApproveFunding } from "../../../state/slice/approve.funding.Slice";
import { approveRejectKYC } from "../../../state/slice/approvedRejectKYC.Slice";

const Investments = () => {
  const dispatch = useDispatch();
  const { investments, loading } = useSelector((state) => state.investments);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isSearchQuery, setIsSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  // to preview the app receipt
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const showModal = (imageSrc) => {
    setSelectedImage(imageSrc);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    dispatch(
      fetchAllInvestments({
        offSet: currentPage,
        limit: pageSize,
        search: isSearchQuery,
      })
    );
  }, [dispatch, isSearchQuery, pageSize, currentPage,]);

  const allInvestments = investments?.data?.fundingRequest;
 

  const handlePageChange = (page, newPageSize) => {
    setCurrentPage(page);
    setPageSize(newPageSize);
  };

  const handleApproved = async (customerId) => {
    setIsLoading(true);
    const payload = {
      uuid: customerId,
      status: "APPROVED",
    };
    try {
      const res = await dispatch(ApproveFunding(payload)).unwrap();
      setIsLoading(false);
      toast.success(res.message);
      dispatch(
        fetchAllInvestments({
          page: currentPage,
          limit: pageSize,
          search: isSearchQuery,
        })
      );
    } catch (err) {
      setIsLoading(false);
      toast.error(err?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async (customerId) => {
    setIsRejecting(true);
    const payload = {
      uuid: customerId,
      status: "REJECTED",
    };
    try {
      const res = await dispatch(approveRejectKYC(payload)).unwrap();
      setIsRejecting(false);
      toast.success(res.message);
      dispatch(
        fetchAllInvestments({
          page: currentPage,
          limit: pageSize,
          search: isSearchQuery,
        })
      );
    } catch (err) {
      setIsRejecting(false);
      toast.error(err?.data?.message || err.message);
    } finally {
      setIsRejecting(false);
    }
  };

  const renderActionMenu = (customerId) => {
    return (
      <Menu className="actions__keys">
        <Menu.Item key="approved" onClick={() => handleApproved(customerId)}>
          {isLoading ? "Processing" : "Approved"}
        </Menu.Item>
        <Menu.Item key="reject" onClick={() => handleReject(customerId)}>
          {isRejecting ? "Processing" : "Reject"}
        </Menu.Item>
      </Menu>
    );
  };

  const actionColumn = {
    title: "Actions",
    dataIndex: "uuid",
    key: "uuid",
    render: (_, record, index) => (
      <Dropdown
        overlay={renderActionMenu(record?.uuid, index)}
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

  const invest_col = GetInvestmentColumns(isSearchQuery, showModal, loading);

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
            <TransaSort
              name="PDF"
              onClick={() =>
                exportToPDF(
                  allInvestments,
                  "Funding Report",
                  invest_col,
                  "landscape"
                )
              }
            />
            <TransaSort
              name="EXCEL"
              onClick={() =>
                exportToExcel(allInvestments, "Funding Report", invest_col)
              }
            />
            <Button
              size="large"
              type="primary"
              onClick={() => setIsOpen(!isOpen)}
            >
              Add Address
            </Button>
          </Styled.Wrapper>
        </Styled.Section>

        <Table
          type="primary"
          columns={invest_col.concat(actionColumn)}
          dataSource={allInvestments}
          loading={loading}
          rowKey="id"
          rowSelection="checked"
          pagination={{
            total: investments?.data?.total,
            pageSize: pageSize,
            current: currentPage,
            showSizeChanger: true,
            onChange: handlePageChange,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} investments`,
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

      {isOpen && (
        <Modal
          title="Add Wallet Address"
          onCancel={() => setIsOpen(false)}
          open={isOpen}
          width={400}
          footer={null}
        >
          <AddAddress />
        </Modal>
      )}

      {/* receipt image preview */}
      <Modal
        title="Receipt"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
        width={400}
        bodyStyle={{ padding: 0, maxHeight: "60vh" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
            overflow: "hidden",
          }}
        >
          <img
            src={selectedImage}
            alt="receipt preview"
            style={{ maxHeight: "100%", maxWidth: "100%" }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Investments;
