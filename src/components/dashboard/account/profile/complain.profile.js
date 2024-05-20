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
      oldPassword: "",
      newPassword: "",
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
          name="oldPassword"
          value={formik.values.oldPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <Styled.Section sx="error">
          {formik.touched.oldPassword &&
            formik.errors.oldPassword &&
            formik.errors.oldPassword}
        </Styled.Section>
      </Styled.Section>

      <Styled.Section sx="new__auth__wrapper pt-3 mb-20">
        <Styled.Span>New Password</Styled.Span>
        <Styled.Input
          type="password"
          placeholder="***"
          name="newPassword"
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <Styled.Section sx="error">
          {formik.touched.newPassword &&
            formik.errors.newPassword &&
            formik.errors.newPassword}
        </Styled.Section>
      </Styled.Section>

      <Button type="primary" size="large" htmlType="submit" loading={isLoading} className="mb-5">
        Submit
      </Button>
    </Styled.Form>
  );
};

export default ChangePassword;
