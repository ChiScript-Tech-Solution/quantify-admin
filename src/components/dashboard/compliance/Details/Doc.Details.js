import React, { useEffect, useState } from "react";
import { Styled } from "../../../../constants/Styled";
import { ModalTitle } from "../../../../common/Styled/Styled";
import { Icons } from "../../../../constants/Icons";
import {
  merch__doc,
} from "../../../../data/Compliance.Data";
import { TransaButton } from "../../../../common";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleCustomers } from "../../../../state/slice/SingleCustomer.Slice";
import {  Modal, Spin, message } from "antd";
import { approveRejectKYC } from "../../../../state/slice/approvedRejectKYC.Slice";
import { removeUserDelux } from "../../../../state/slice/removeDelux.Slice";
import { toast } from "react-toastify";
import { fetchAllCustomers } from "../../../../state/slice/Customer.Slice";
import { fetchUserDelux } from "../../../../state/slice/userDelux.Slice"
import { formatAmount, formatDateAndTime } from "../../../../utils/Utils";
import UpdateDelux from "./UpdateDelux";
import AddDelux from "./AddDelux";


const DocDetails = ({ customerId, close }) => {
  const dispatch = useDispatch();
  const [selectedDocument, setSelectedDocument] = useState("All Delux");
  const [ isApproved, setIsApproved ] = useState(false);
  const [ isFormLoading, setIsFormLoading ] = useState([]);
  const { userDelux, loading } = useSelector(state => state.userDelux);
  const [ isUpdateDelux, setIsUpdateDelux] = useState(false);
  const [ isSelectedUser, setIsSelectedUser] = useState(false);
  const { singleCustomer } = useSelector((state) => state.singleCustomer);


  useEffect(() => {
      const payload = customerId;
      dispatch(fetchSingleCustomers(payload));
  },[dispatch, customerId])

  const cusDetail = singleCustomer?.data?.task; 

  const userTaskId = cusDetail?.id;

  useEffect(() => {
    const payload = {
      taskId: userTaskId 
  }
    dispatch(fetchUserDelux(payload));
  }, [dispatch, userTaskId])


  const currentUserDelux = userDelux?.data;

  const handleUpdateDelux = (deluxId) => {
    setIsUpdateDelux(!isUpdateDelux)
    setIsSelectedUser(deluxId)
  }
  const isUserDelux = currentUserDelux?.find((item) => item.id === isSelectedUser)


  const setLoadingItem = (itemId, loading) => {
    setIsFormLoading((prevLoadingItems) => ({
      ...prevLoadingItems,
      [itemId]: loading,
    }));
  };


  const removeDelux = async (deluxId) => {
    setLoadingItem(deluxId, true);
    try {
      const payload = {
        deluxId: deluxId
      };
      const deluxTaskId = {
        taskId: userTaskId
    }
      const res = await dispatch(removeUserDelux(payload)).unwrap();
      setLoadingItem(deluxId, false);
      toast.success(res.message);
      dispatch(fetchSingleCustomers(customerId));
      dispatch(fetchAllCustomers({ page: 1, limit: 10, search: "" }));
      dispatch(fetchUserDelux(deluxTaskId));
    } catch (err) {
      setLoadingItem(deluxId, false);
      toast.error(err?.data?.message || err.message);
    } finally {
      setLoadingItem(deluxId, false);
    }
  };


  const handleApproved = async () => {
    setIsApproved(true);
    try {
      const userId = {
        id: customerId,
      };
      const response = await dispatch(approveRejectKYC(customerId)).unwrap();
      setIsApproved(false);
      message.success(response?.message);
      dispatch(fetchSingleCustomers(userId));
    } catch (err) {
      setIsApproved(false);
      message.error(err.message);
    }
  };


  return (
    <>
      <Styled.Wrapper sx="merchant__doc__wrapper">
        <ModalTitle title="Documents" close={close} icon="X" />
        <Styled.Wrapper sx="merchant__doc__content">
          {merch__doc?.map((item, index) => (
            <Styled.Section
              sx="merchant__doc__download"
              key={index}
              onClick={() => setSelectedDocument(item.title)}
            >
              <Styled.Text>{item.title}</Styled.Text>
              <Icons.UploadIcon />
            </Styled.Section>
          ))}
        </Styled.Wrapper>

        {
          selectedDocument === "Add Delux" &&
            <AddDelux selectedDocument={selectedDocument} dispatch={dispatch} customerId={customerId} userTaskId={userTaskId} />
          }

        {selectedDocument === "All Delux" && (
          <>
          {loading ? <Spin className="flex justify-center items-center" /> : (
            <table className="london__table">
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Paid</th>
                  <th>Position</th>
                  <th>Set</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              
                 <tbody>
                 {currentUserDelux?.map((item) => (
                      <tr key={item?.id}>
                      <td>{formatAmount(item?.delux_amount)}</td>
                      <td>{formatAmount(item?.amount_paid)}</td>
                      <td>{item?.position}</td>
                      <td>{item?.set}</td>
                      <td>{formatDateAndTime(item?.createdAt)}</td>
                      <td className="action__btn">
                        <Icons.EditIcon size={20} color="green" onClick={() => handleUpdateDelux(item?.id)} />
                        {isFormLoading[item?.id] ? <Spin size={10} /> : <Icons.DeleteIcon size={20} color="red" onClick={() => removeDelux(item?.id)} /> }
                        </td>
                    </tr>
                 ))}
                
               </tbody>
              
            </table>
            )}
          </>
        )}

        <Styled.Section sx="merchant__doc__btn">
          <TransaButton
            bg="primary"
            width="w-[200px]"
            title="Approved Customer"
            htmlType="submit"
            loading={isApproved}
            onClick={handleApproved}
          />
        </Styled.Section>
      </Styled.Wrapper>

      {isUpdateDelux && (
        <Modal
          title="Update Delux"
          open={isUpdateDelux}
          onCancel={() => handleUpdateDelux()}
          width={400}
          footer={null}
        >
          <UpdateDelux dispatch={dispatch} customerId={customerId} deluxId={isUserDelux} close={handleUpdateDelux} /> 
        </Modal>
      )}
    </>
  );
};

export default DocDetails;
