import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSingleTransaction } from '../../../state/slice/single_transaction.Slice';
import { ModalDetails } from '../../../common';
import { tranx_data } from '../../../data/transactions.Data';

const TransactionDetails = ({ id }) => {
  const dispatch = useDispatch();
  const { singleTransaction } = useSelector(state => state.singleTransaction);

  useEffect(() => {
    dispatch(fetchSingleTransaction(id))
  },[dispatch, id])

  const userTransaction = singleTransaction?.data
  const data = tranx_data(userTransaction)

  return (
    <div>
      <ModalDetails data={data} />
    </div>
  )
}

export default TransactionDetails