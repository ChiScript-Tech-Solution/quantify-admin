import React, { useEffect, useState } from "react";
import { Styled } from "../../../constants/Styled";
import { Dropdown, Menu, Table } from "antd";
import { getCustomersColumns } from "../../../data/Compliance.Data";
import { Icons } from "../../../constants/Icons";
import { TransaDrawer, TransaSearch, TransaSort } from "../../../common";
import { MerchantInformation } from "./Details";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCustomers } from "../../../state/slice/Customer.Slice"
import { exportToPDF } from "../../../utils/Utils";

const ComplianceMerchant = () => {
  const [ isViewDetails, setIsViewDetails ] = useState(false);
  const [ selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [ selectedCustomerPhone, setSelectedCustomerPhone] = useState(null);
  const dispatch = useDispatch();
  const { customers, loading } = useSelector((state) => state.customers);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ pageSize, setPageSize ] = useState(10);
  const [ isSearchQuery, setIsSearchQuery ] = useState("");
  // const [ isFilter, setIsFilter ] = useState(null);

  const handleView = (customerId, phoneNumber) => {
    setSelectedCustomerId(customerId);
    setSelectedCustomerPhone(phoneNumber)
    setIsViewDetails(!isViewDetails);
  };

  console.log("SelectedCustomerId:", selectedCustomerId)
  console.log("SelectedCustomerPhone:", selectedCustomerPhone)

  useEffect(() => {
      dispatch(fetchAllCustomers({
        offSet: currentPage,
        limit: pageSize,
        // search: isSearchQuery,

      }));
  },[dispatch, currentPage, pageSize])

  const allCUstomers = customers?.data?.users;


  const handlePageChange = (page, newPageSize) => {
    setCurrentPage(page);
    setPageSize(newPageSize);
  };


  // const handleFilterChange = (selectedValue) => {
  //   setIsFilter(selectedValue);
  // };
  
  const renderActionMenu = (customerId, phoneNumber) => {
    return (
      <Menu className="actions__keys">
        <Menu.Item key="view" onClick={() => handleView(customerId, phoneNumber)}>
          View Details
        </Menu.Item>
      </Menu>
    );
  };

  const actionColumn = {
    title: "Actions",
    dataIndex: "profile",
    render: (_, record, index) => (
      <Dropdown
        overlay={renderActionMenu(record?.countryCode, record?.phoneNumber, index)}
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

  const compliance__col = [...getCustomersColumns, actionColumn];

  return (
    <>
      <Styled.Wrapper>
        <Styled.Section sx="compliance__wrapper">
        <TransaSearch
            placeholder="Search by ID / Purpose"
            value={isSearchQuery}
            onChange={(e) => setIsSearchQuery(e.target.value)}
          />

          <Styled.Wrapper sx="flex justify-center items-center gap-[8px] ">
          {/* <TransaFilter
              onChange={handleFilterChange}
              defaultValue={"filter"}
              options={filteredUserOptions}
            /> */}

          <TransaSort name="PDF" onClick={() => exportToPDF(allCUstomers, 'Customers Report', compliance__col, 'landscape')} />
          </Styled.Wrapper>
        </Styled.Section>

        <Table
          type="primary"
          columns={compliance__col}
          dataSource={allCUstomers}
          rowKey="id"
          rowSelection="checked"
          loading={loading}
          pagination={{
            total: customers?.data?.total * pageSize,
            pageSize: pageSize,
            current: currentPage,
            showSizeChanger: true,
            onChange: handlePageChange,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} customers`,
            pageSizeOptions: [ "10", "20", "30", "40", "50", "60", "70", "80", "100",
            ],
          }}
          className="centered-pagination"
        />
      </Styled.Wrapper>

      {isViewDetails && selectedCustomerId &&  (
        <TransaDrawer open={isViewDetails} closable={false} width="500px">
          <Styled.Wrapper sx="transa__merchant__wrapper">
            <MerchantInformation customerId={selectedCustomerId} phoneNumber={selectedCustomerPhone} close={handleView}/>
          </Styled.Wrapper>
        </TransaDrawer>
      )}
    </>
  );
};

export default ComplianceMerchant;
