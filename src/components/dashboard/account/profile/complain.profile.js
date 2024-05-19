import React, { useState } from "react";

import { Button } from "antd";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { schema } from "../../../../schema/Schema";
import { toast } from "react-toastify";
import { changePasswordRequest } from "../../../../state/slice/changePassword.Slice";
import { Styled } from "../../../../constants/Styled";

const ChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  // const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      old_password: "",
      new_password: "",
    },

    validationSchema: schema.changePasswordSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await dispatch(changePasswordRequest(values)).unwrap();
        setIsLoading(false);
        toast.success(response?.message);
        formik.resetForm();
      } catch (err) {
        toast.error(err.message || err?.response?.message);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <Styled.Form onSubmit={formik.handleSubmit}>
      <Styled.Text>Change Password</Styled.Text>

      <Styled.Section sx="new__auth__wrapper">
        <Styled.Span>Old Password</Styled.Span>
        <Styled.Input
          type="password"
          placeholder="****"
          name="old_password"
          value={formik.values.old_password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <Styled.Section sx="error">
          {formik.touched.old_password &&
            formik.errors.old_password &&
            formik.errors.old_password}
        </Styled.Section>
      </Styled.Section>

      <Styled.Section sx="new__auth__wrapper pt-3 mb-20">
        <Styled.Span>New Password</Styled.Span>
        <Styled.Input
          type="password"
          placeholder="***"
          name="new_password"
          value={formik.values.new_password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <Styled.Section sx="error">
          {formik.touched.new_password &&
            formik.errors.new_password &&
            formik.errors.new_password}
        </Styled.Section>
      </Styled.Section>

      <Button type="primary" size="large" htmlType="submit" loading={isLoading} className="mb-5">
        Submit
      </Button>
    </Styled.Form>
  );
};

export default ChangePassword;
