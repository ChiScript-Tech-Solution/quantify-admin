import React, { useEffect, useState } from 'react'
import { Styled } from '../../../../constants/Styled'
import { Button, Input } from 'antd'
import { useFormik } from 'formik';
import { changeUserDelux } from '../../../../state/slice/updateDelux.Slice';
import { toast } from 'react-toastify';
import { fetchSingleCustomers } from '../../../../state/slice/SingleCustomer.Slice';
import { deluxOptions, deluxSet } from '../../../../data/Compliance.Data';
import { fetchUserDelux } from '../../../../state/slice/userDelux.Slice';
import { useSelector } from 'react-redux';

const UpdateDelux = ({ dispatch, customerId, deluxId, close }) => {
  const [ isLoading, setIsLoading ] = useState(false)
  const { singleCustomer } = useSelector((state) => state.singleCustomer);


  useEffect(() => {
      const payload = customerId;
      dispatch(fetchSingleCustomers(payload));
  },[dispatch, customerId])

  const cusDetail = singleCustomer?.data?.task; 

  const taskId = {
    taskId: cusDetail?.id
  }
    
    const handleFormSubmit = async (values) => {
        setIsLoading(true);
        try {
          const  res = await dispatch(changeUserDelux(values)).unwrap();
          setIsLoading(false);
          toast.success(res.message);
          dispatch(fetchSingleCustomers(customerId));
          dispatch(fetchUserDelux(taskId));
          close();
        } catch (err) {
          setIsLoading(false);
          toast.error(err?.data?.message || err.message);
        } finally {
          setIsLoading(false);
        }
      };

    const updateDelux = useFormik({
        initialValues: {
          amount: deluxId?.delux_amount,
          position: deluxId?.position,
          deluxId: deluxId?.id,
          set: deluxId?.set,
        },
        onSubmit: handleFormSubmit,
      });

  return (
    <div>
         <Styled.Form
              onSubmit={updateDelux.handleSubmit}    
            >
              <Styled.Wrapper sx="merchant__doc__view__wrapper__update mt-5">
                <Input
                  placeholder="amount"
                  type="text"
                  size="large"
                  name="amount"
                  value={updateDelux.values.amount
                  }
                  onChange={updateDelux.handleChange
                  }
                />

                <select
                  name="position"
                  value={updateDelux.values.position}
                  onChange={updateDelux.handleChange
                  }
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
                  value={updateDelux.values.set
                  }
                  onChange={updateDelux.handleChange
                  }
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
                  className='w-full'
                >
                  Update Delux
                </Button>
              </Styled.Wrapper>
            </Styled.Form>
    </div>
  )
}

export default UpdateDelux