import { Button, Spin } from 'antd'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { schema } from "../../../schema/Schema";
import { userAddWallet } from "../../../state/slice/add_address.Slice";
import { fetchFundAddress } from "../../../state/slice/fundingAddress.Slice";
import { deleteFundAddress } from "../../../state/slice/deleteAddress.Slice";
import { updateFundAddress } from "../../../state/slice/updateAddress.Slice"
import { toast } from 'react-toastify';
import { Icons } from '../../../constants/Icons';
import { CustomInput } from '../../../common';

const AddAddress = () => {
  const dispatch = useDispatch()
  const [ loading, setLoading] = useState(false);
  const [ isUpdating, setIsUpdating ] = useState(false);
  const [ deleting, setDeleting] = useState(false);
  const [ isEdit, setIsEdit ] = useState(false);
  const { fundAddress } = useSelector(state => state.fundAddress)


  const addedAddress = fundAddress?.data

  const handleEdit = (addId) => {
    if (addId) {
      const editedItem = addedAddress.find((item) => item.uuid === addId);
      if (editedItem) {
        formik.setValues({
          uuid: editedItem.uuid,
          name: editedItem.name,
          mainnet: editedItem.mainnet,
          address: editedItem.address,
        });
      }
    }
    setIsEdit(!isEdit);
  };


  useEffect(() => {
    dispatch(fetchFundAddress())
  }, [dispatch])


  const handleAddWallet = async (values) => {
    setLoading(true);
    try {
      const res = await dispatch(userAddWallet(values)).unwrap();
      setLoading(false);
      toast.success(res.message);
      dispatch(fetchFundAddress())
    } catch (err) {
      setLoading(false);
      toast.error(err?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }


  const updateAddWallet = async (values) => {
    setIsUpdating(true);
    try {
      const payload = {
        uuid: values.uuid,
        name: values?.name,
        mainnet: values?.mainnet,
        address: values?.address
      }
      const res = await dispatch(updateFundAddress(payload)).unwrap();
      toast.success(res.message);
      dispatch(fetchFundAddress())
      setIsUpdating(false);
      formik.resetForm();
    } catch (err) {
      setIsUpdating(false);
      toast.error(err?.data?.message || err.message);
    } finally {
      setIsUpdating(false);
    }
  }


  const handleDeleteAddress = async (addressId) => {
    setDeleting(true);
    try {
      const payload = {
        uuid: addressId.toString()
      }
      const res = await dispatch(deleteFundAddress(payload)).unwrap();
      setDeleting(false);
      toast.success(res.message);
      dispatch(fetchFundAddress())
    } catch (err) {
      setDeleting(false);
      toast.error(err.data.message[0] || err?.data?.message || err.message);
    } finally {
      setDeleting(false);
    }
  }



  const formik = useFormik({
    initialValues: {
      name: "",
      mainnet: " ",
      address: "",
    },
    validationSchema: schema.addWalletSchema,
    onSubmit: async (values) => {
      if (isEdit) {
        await updateAddWallet(values);
        setIsEdit(false);
      } else {
        handleAddWallet(values);
      }
    },
    validateOnMount: true,
  });



  return (
    <>
      <form onSubmit={formik.handleSubmit}>

        <CustomInput
          isEdit={isEdit} 
          type="text"
          placeholder='Wallet Name'
          size='large'
          className='mt-3 mb-2'
          name='name'
          value={isEdit ? formik.values.name : formik.values.name}
          onChange={formik.handleChange}
        />

        <CustomInput
          isEdit={isEdit} 
           type="text"
           placeholder='Wallet Address'
           size='large'
           name='address'
           value={isEdit ? formik.values.address : formik.values.address}
           onChange={formik.handleChange}
        />

        <CustomInput
          isEdit={isEdit} 
          className='mt-3 mb-2'
           type="text"
           placeholder='Main Net'
           size='large'
           name='mainnet'
           value={isEdit ? formik.values.mainnet : formik.values.mainnet}
           onChange={formik.handleChange}
        />


        <Button
          type="primary"
          size="large"
          disabled={!formik.isValid}
          loading={isUpdating || loading}
          className="my-5 w-full"
          htmlType="submit"
        >
          {isEdit ? "Update Record" : "Save"}
        </Button>
      </form>

      {deleting ?  <div className='flex justify-center items-center'><Spin size={20} /></div>   : addedAddress?.length === 0 ? <div className='flex justify-center items-center'>No Address Added</div> :
        <>
          {addedAddress?.map((item) => (
            <div className='flex justify-between items-center border-t-2 border-t-black' key={item?.uuid}>
              <span className='text-black font-semibold'>{item?.address.slice(0, 12)}</span>
              <section className='flex justify-center items-center space-x-2'>
                <span>{item?.name}</span>
                <Icons.EditIcon color='#3B6352' size={20} className='cursor-pointer' onClick={() => handleEdit(item?.uuid)}/>
                {deleting ? <Spin size={20} /> : <Icons.DeleteIcon color='red' size={20} className='cursor-pointer' onClick={() => handleDeleteAddress(item?.uuid)} />}
              </section>
            </div>
          ))}
        </>
      }
    </>

  )
}

export default AddAddress