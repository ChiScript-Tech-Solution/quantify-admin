import React, { useState } from "react";
import { Images } from "../../constants/Images";
import { TransaButton } from "../../common";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import {  message } from "antd";
import { schema } from "../../schema/Schema";
import { Styled } from "../../constants/Styled";
import { userForgotPassword } from "../../state/slice/forgotPassword.Auth.Slice";
import { toast } from "react-toastify";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
    },

    validationSchema: schema.forgotPasswordSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await dispatch(userForgotPassword(values)).unwrap();
        setIsLoading(false);
        toast.success(response?.message);
        formik.resetForm();
      } catch (err) {
        message.error(err.message);
      } finally {
        setIsLoading(false);
      }
    },
  });


  return (
    <Styled.Wrapper sx="auth__wrapper">
      <Styled.Aside>
        <Styled.Img alt="auth image" img={Images.AuthBg} />
        {/* <Icons.Logo3 sx="auth__icon" size="64" /> */}
        <Styled.Section sx="auth__img__content">
          <Styled.Text>
          Empowering your cause and fostering growth has never been more straightforward.
          </Styled.Text>
          <Styled.Span>
            We're here to serve you @smeandmore.com
          </Styled.Span>
        </Styled.Section>
      </Styled.Aside>

      <Styled.Section sx="auth__main">
        <Styled.Wrapper sx="auth__main__wrapper">
          <Styled.Linked as="/">
            {/* <Icons.Logo3 size="64" /> */}
          </Styled.Linked>

          <Styled.Text sx="auth__main__wrapper__title">
            Welcome back to SME AND MORE!
          </Styled.Text>

          <Styled.Span>Enter your registered email to reset password</Styled.Span>

          <Styled.Form sx="auth__form" onSubmit={formik.handleSubmit}>
            <Styled.Section sx="auth__form__wrapper">
              <Styled.Span>Email Address</Styled.Span>
              <Styled.Input
                type="email"
                placeholder="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <Styled.Section sx="error">
                {formik.touched.email &&
                  formik.errors.email &&
                  formik.errors.email}
              </Styled.Section>
            </Styled.Section>

            <Styled.Section sx="auth__forgot">
                <Styled.Wrapper sx="auth__forgot__check">
                  <Styled.Text>Password Remembered?</Styled.Text>
                </Styled.Wrapper>
                <Styled.Linked as="/" >Login</Styled.Linked> 
              </Styled.Section>

            <>
             
             <TransaButton 
                sx="auth__login"
                bg="primary"
                htmlType="submit"
                loading={isLoading}
                title="Send"
             />
            </>
          </Styled.Form>
        </Styled.Wrapper>
      </Styled.Section>
    </Styled.Wrapper>
  );
};

export default Login;
