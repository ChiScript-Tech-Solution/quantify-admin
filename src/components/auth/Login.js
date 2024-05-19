import React, { useEffect, useState } from "react";
import { Images } from "../../constants/Images";
import { TransaButton  } from "../../common";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {  message } from "antd";
import { loginUser } from "../../state/slice/Auth.Slice";
import { schema } from "../../schema/Schema";
import { Styled } from "../../constants/Styled";


const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      countryCode: "+234",
      phoneNumber: "",
      password: "",
    },

    validationSchema: schema.loginSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await dispatch(loginUser(values)).unwrap();
        setIsLoading(false);
        message.success(response?.message)
        formik.resetForm();
      } catch (err) {
        message.error(err.message);
      } finally {
        setIsLoading(false);
      }
    },
  });

  useEffect(() => {
    if (user) {
      navigate("/dashboard/customers");
    }
  }, [user, navigate]);

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
            We're here to serve you @Quantify.com
          </Styled.Span>
        </Styled.Section>
      </Styled.Aside>

      <Styled.Section sx="auth__main">
        <Styled.Wrapper sx="auth__main__wrapper">
          <Styled.Linked as="/">
            {/* <Icons.Logo3 size="64" /> */}
          </Styled.Linked>

          <Styled.Text sx="auth__main__wrapper__title">
            Welcome to Quantify!
          </Styled.Text>

          <Styled.Span>Login to your account</Styled.Span>

          <Styled.Form sx="auth__form" onSubmit={formik.handleSubmit}>
            <Styled.Section sx="auth__form__wrapper">
              <Styled.Span>Email Address</Styled.Span>
              <Styled.Input
                type="text"
                placeholder="Phone Number"
                name="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <Styled.Section sx="error">
                {formik.touched.phoneNumber &&
                  formik.errors.phoneNumber &&
                  formik.errors.phoneNumber}
              </Styled.Section>
            </Styled.Section>

            <Styled.Section sx="auth__form__wrapper">
              <Styled.Span>Enter Password</Styled.Span>
              <Styled.Input
                type="password"
                placeholder="****"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <Styled.Section sx="error">
                {formik.touched.password &&
                  formik.errors.password &&
                  formik.errors.password}
              </Styled.Section>
            </Styled.Section>

            <div>
              <Styled.Section sx="auth__forgot">
                <Styled.Linked as="/admin/forgot/password" >Forgot Password ?</Styled.Linked> 
              </Styled.Section>

              {formik.touched.acceptTerms && formik.errors.acceptTerms && (
                  <Styled.Section sx="error">
                    {formik.errors.acceptTerms}
                  </Styled.Section>
                )}
            </div>

            <>
             
             <TransaButton 
                sx="auth__login"
                bg="primary"
                htmlType="submit"
                loading={isLoading}
                title="Login"
             />
            </>
          </Styled.Form>
        </Styled.Wrapper>
      </Styled.Section>
    </Styled.Wrapper>
  );
};

export default Login;
