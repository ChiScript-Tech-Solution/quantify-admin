import React, { useState } from "react";
import { Styled } from "../../../../constants/Styled";
import { Button, Input } from "antd";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { schema } from "../../../../schema/Schema";
import { toast } from "react-toastify";
import { inviteAdminRequest } from "../../../../state/slice/inviteAdmin.Slice";
import { fetchAdminUser } from "../../../../state/slice/admin.Slice";

const InviteAdmin = ({ close }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [ closeModal, setCloseModal ] = useState(false);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    },

    validationSchema: schema.inviteAdminSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await dispatch(inviteAdminRequest(values)).unwrap();
        setIsLoading(false);
        toast.success(response.message);
        setCloseModal(close)
        dispatch(fetchAdminUser());
        formik.resetForm();
      } catch (err) {
        toast.error(err.message);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div>
      <Styled.Wrapper sx="mt-10">
        {closeModal ? "" : ""}
        <Styled.Form onSubmit={formik.handleSubmit}>
          <Styled.Section sx="invite__auth__input">
            <Styled.Text>First Name</Styled.Text>
            <Input
              size="large"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Styled.Section>

          <Styled.Section sx="invite__auth__input pt-5">
            <Styled.Text>Last Name</Styled.Text>
            <Input
              size="large"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Styled.Section>

          <Styled.Section sx="invite__auth__input pt-5">
            <Styled.Text>Phone Number</Styled.Text>
            <Input
              size="large"
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Styled.Section>

          <Styled.Section sx="invite__auth__input pt-5">
            <Styled.Text>Email Address</Styled.Text>
            <Input
              size="large"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Styled.Section>

          <Button
            className="invite__btn"
            type="primary"
            size="large"
            loading={isLoading}
            htmlType="submit"
          >
            Send Invite
          </Button>
        </Styled.Form>
      </Styled.Wrapper>
    </div>
  );
};

export default InviteAdmin;
