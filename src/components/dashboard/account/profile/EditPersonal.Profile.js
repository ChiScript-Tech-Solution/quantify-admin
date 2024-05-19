import React, { useState } from "react";
import { Styled } from "../../../../constants/Styled";
import { Button, Input } from "antd";

import { updateUserDetails } from "../../../../state/slice/Auth.Slice";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { schema } from "../../../../schema/Schema";
import { userUpdateInfo } from "../../../../state/slice/updateUser.Auth.Slice";
import { toast } from "react-toastify";

const EditPersonalProfile = ({ close }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      full_name: user?.full_name,
      phone_number: user?.phone_number,
    },

    validationSchema: schema.userUpdateSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await dispatch(userUpdateInfo(values)).unwrap();
        setLoading(close);
        toast.success(response?.message);
        dispatch(updateUserDetails(response?.data));
        formik.resetForm();
      } catch (err) {
        setLoading(false);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <form className="pt-5" onSubmit={formik.handleSubmit}>
        <Styled.Section sx="invite__auth__input">
          <Styled.Text>Full Name</Styled.Text>
          <Input
            className="capitalize"
            type="text"
            size="large"
            name="full_name"
            placeholder={user?.full_name}
            value={formik.values.full_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Styled.Section sx="error">
            {formik.touched.full_name &&
              formik.errors.full_name &&
              formik.errors.full_name}
          </Styled.Section>
        </Styled.Section>

        <Styled.Section sx="invite__auth__input py-3">
          <Styled.Text>Phone Number</Styled.Text>
          <Input
            className="capitalize"
            size="large"
            name="phone_number"
            type="text"
            placeholder={user?.phone_number}
            value={formik.values.phone_number}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled
          />
          <Styled.Section sx="error">
            {formik.touched.phone_number &&
              formik.errors.phone_number &&
              formik.errors.phone_number}
          </Styled.Section>
        </Styled.Section>

        <Styled.Section sx="invite__auth__input">
          <Styled.Text>Phone Number</Styled.Text>
          <Input
            className="capitalize"
            size="large"
            name="phoneNumber"
            type="text"
            placeholder={user?.phoneNumber ?? "Enter Phone Number"}
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled
          />
          <Styled.Section sx="error">
            {formik.touched.phoneNumber &&
              formik.errors.phoneNumber &&
              formik.errors.phoneNumber}
          </Styled.Section>
        </Styled.Section>

        <Styled.Section sx="invite__auth__input py-3">
          <Styled.Text>Nationality</Styled.Text>
          <Input
            className="capitalize"
            size="large"
            name="nationality"
            type="text"
            placeholder={user?.nationality ?? "Enter Nationality"}
            value={formik.values.nationality}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Styled.Section sx="error">
            {formik.touched.nationality &&
              formik.errors.nationality &&
              formik.errors.nationality}
          </Styled.Section>
        </Styled.Section>

        <Styled.Section sx="invite__auth__input">
          <Styled.Text>State</Styled.Text>
          <Input
            className="capitalize"
            size="large"
            name="state"
            type="text"
            placeholder={user?.state ?? "Enter state"}
            value={formik.values.state}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Styled.Section sx="error">
            {formik.touched.state && formik.errors.state && formik.errors.state}
          </Styled.Section>
        </Styled.Section>

        <Styled.Section sx="invite__auth__input py-3">
          <Styled.Text>City</Styled.Text>
          <Input
            size="large"
            name="city"
            type="text"
            placeholder={user?.city ?? "Enter City"}
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Styled.Section sx="error">
            {formik.touched.city && formik.errors.city && formik.errors.city}
          </Styled.Section>
        </Styled.Section>

        <Styled.Section sx="invite__auth__input">
          <Styled.Text> Address</Styled.Text>
          <Input
            size="large"
            name="address"
            placeholder={user?.address ?? "Enter address"}
            type="text"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Styled.Section sx="error">
            {formik.touched.address &&
              formik.errors.address &&
              formik.errors.address}
          </Styled.Section>
        </Styled.Section>

        <Styled.Section sx="invite__auth__input pt-3">
          <Styled.Text> Gender</Styled.Text>
          <Input
            size="large"
            type="text"
            name="gender"
            placeholder={user?.gender ?? "Enter gender"}
            value={formik.values.gender}
            onChange={formik.handleChange}
          />
          <Styled.Section sx="error">
            {formik.touched.gender &&
              formik.errors.gender &&
              formik.errors.gender}
          </Styled.Section>
        </Styled.Section>

        <Button
          className="invite__btn"
          type="primary"
          size="large"
          htmlType="submit"
          loading={loading}
        >
          Save
        </Button>
      </form>
    </>
  );
};

export default EditPersonalProfile;
