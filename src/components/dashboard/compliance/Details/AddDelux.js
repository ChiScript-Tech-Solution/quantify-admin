import React, { useState } from 'react'
import { Styled } from '../../../../constants/Styled'
import { Button, Input } from 'antd'
import { addDeluxToUser } from '../../../../state/slice/addDelux.Slice';
import { fetchSingleCustomers } from '../../../../state/slice/SingleCustomer.Slice';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { deluxOptions, deluxSet } from '../../../../data/Compliance.Data';
import { fetchUserDelux } from '../../../../state/slice/userDelux.Slice';


const AddDelux = ({selectedDocument, dispatch, customerId,  userTaskId}) => {
    const [ isLoading, setIsLoading ] = useState(false);

    const payload = {
      taskId: userTaskId,
    }

    const handleFormSubmit = async (values) => {
        setIsLoading(true);
        try {
          const  res = await dispatch(addDeluxToUser(values)).unwrap();
          setIsLoading(false);
          toast.success(res.message);
          dispatch(fetchSingleCustomers(customerId));
          dispatch(fetchUserDelux(payload));
        } catch (err) {
          setIsLoading(false);
          toast.error(err?.data?.message || err.message);
        } finally {
          setIsLoading(false);
        }
      };
    
    
      const addDelux = useFormik({
        initialValues: {
          uuid: customerId,
          amount: "",
          position: "",
          set: "",
        },
        onSubmit: handleFormSubmit,
      });
  return (
    
    <Styled.Form
    onSubmit={addDelux.handleSubmit}
  >
    <Styled.Wrapper sx="merchant__doc__view__wrapper">
      <Styled.Text>{selectedDocument}</Styled.Text>
      <Input
        placeholder="amount"
        type="text"
        size="large"
        name="amount"
        value={addDelux.values.amount}
        onChange={addDelux.handleChange}
      />

      <select
        name="position"
        value={addDelux.values.position}
        onChange={addDelux.handleChange}
      >
        <option defaultValue>Delux Position</option>
        {deluxOptions.map((item, index) => (
          <option value={item?.value} key={index}>
            {item?.label}
          </option>
        ))}
      </select>

      <select
        name="set"
        value={addDelux.values.set}
        onChange={addDelux.handleChange }
      >
        <option defaultValue>Set Delux</option>
        {deluxSet.map((item, index) => (
          <option value={item?.value} key={index}>
            {item?.label}
          </option>
        ))}
      </select>

      <Button
        loading={isLoading}
        htmlType="submit"
        type="primary"
        size="large"
        className='w-full mt-4'
      >
          Add Delux
      </Button>
    </Styled.Wrapper>
  </Styled.Form>
  )
}

export default AddDelux