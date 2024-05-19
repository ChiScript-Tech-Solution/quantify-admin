import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleWithdraw } from "../../../state/slice/single_withdraw.Slice"
import { withdraw_data } from '../../../data/loan.Data';
import { ModalDetails } from '../../../common';

const WithdrawDetails = ({ id }) => {
    const dispatch = useDispatch();
    const {  singleWithdraw } = useSelector(state => state.singleWithdraw)

    useEffect(() => {
        dispatch(fetchSingleWithdraw(id))
    },[dispatch, id])


    const withdrawDetails = singleWithdraw?.data;
    const data = withdraw_data(withdrawDetails)


  return (
    <ModalDetails data={data} withdrawId={id} datas={withdrawDetails} />
  )
}

export default WithdrawDetails