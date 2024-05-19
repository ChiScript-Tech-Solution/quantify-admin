import React, { useEffect} from 'react'
import { ModalDetails } from '../../../common'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSingleFunding } from '../../../state/slice/single_funding.Slice';
import { funding_data } from '../../../data/Investment.Data';


const FundingDetails = ({ id }) => {
    const dispatch = useDispatch();
    const { singleFunding } = useSelector(state => state.singleFunding)


    useEffect(() => {
        dispatch(fetchSingleFunding(id))
    },[dispatch, id])

    const fundingDetails = singleFunding?.data
    const data = funding_data(fundingDetails)

  return (
    <div>
        <ModalDetails data={data}/>
    </div>
  )
}

export default FundingDetails