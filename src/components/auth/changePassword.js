import React, { useState } from "react";
import { Images } from "../../constants/Images";
import { Button, Input } from "antd";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { userNewPassword} from "../../state/slice/setNewPassword.Slice";
import { schema } from "../../schema/Schema";
import { Styled } from "../../constants/Styled";

const ChangePassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const dispatch = useDispatch();
  const [ isLoading, setIsLoading ] = useState(false);


  const formik = useFormik({
    initialValues: {
      token: token,
      password: "",
      confirm_password: "",
    },

    validationSchema: schema.acceptInviteSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await dispatch(userNewPassword(values)).unwrap();
        setIsLoading(false);
        toast.success(response.message);
        formik.resetForm();
        navigate("/");
      } catch (err) {
        toast.error(err.message);
      } finally {
        setIsLoading(false);
      }
    },
  });

  const isPasswordMatch =
    formik.values.password === formik.values.confirm_password;

  return (
    <>
      <Styled.Wrapper sx="change__password__container__wrapper">
        <Styled.Section sx="change__password__success__content">
          <center>
            <Styled.Img img={Images.Logo} alt="" />
          </center>
          <Styled.Text sx="reset__password__title">Set New Password</Styled.Text>
          <Styled.Text sx="new__auth__change__desc">
            {/* <Icons.DangerIcon /> */}
            Password must include at a digit, uppercase character, lowercase
            character, symbol and be at least 8 characters long.
          </Styled.Text>
          <Styled.Form sx="w-full" onSubmit={formik.handleSubmit}>
            <Styled.Section sx="password__auth pt-10">
              <Styled.Span>New Password</Styled.Span>
              <Input.Password
              size="large"
                type="password"
                placeholder="****"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="pictcher__input"
              />
              <Styled.Section sx="error">
                {formik.touched.password &&
                  formik.errors.password &&
                  formik.errors.password}
              </Styled.Section>
            </Styled.Section>

            <Styled.Section sx="password__auth pt-5">
              <Styled.Span>Confirm Password</Styled.Span>
              <Input.Password
              size="large"
                type="password"
                placeholder="****"
                name="confirm_password"
                value={formik.values.confirm_password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="pictcher__input"
              />
              <Styled.Section sx="error">
                {formik.touched.confirm_password &&
                  formik.errors.confirm_password &&
                  isPasswordMatch === false && (
                    <> {formik.errors.confirm_password}</>
                  )}
              </Styled.Section>
            </Styled.Section>

            <Button
              type="primary"
              size="large"
              className="w-full mt-10 text-[20px] font-semibold"
              htmlType="submit"
              loading={isLoading}
            >
              Save
            </Button>

          </Styled.Form>
        </Styled.Section>
      </Styled.Wrapper>
    </>
  );
};

export default ChangePassword;
