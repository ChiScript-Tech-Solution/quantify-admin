import React, { useState } from "react";
import { Button, Upload } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Styled } from "../../../../constants/Styled";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateUserPhoto } from "../../../../state/slice/uploadPhoto.Slice";
import { toast } from "react-toastify";
import { updateUserDetails } from "../../../../state/slice/Auth.Slice";

const validationSchema = Yup.object().shape({
  image: Yup.mixed().required("Image is required"),
});

const UploadPhotoProfile = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      image: null,
    },

    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append("image", values.image);
        const response = await dispatch(updateUserPhoto(formData)).unwrap();
        setIsLoading(false);
        toast.success(response?.message);
        dispatch(updateUserDetails(response?.data))
      } catch (err) {
        toast.error(err.message);
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleImageUpload = (file) => {
    setUploadedImage(file);
    formik.setFieldValue("image", file);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Styled.Section sx="merchant__overview__header__wrapper border__inner">
        <Styled.Card sx="merchant__overview__header">
          <Styled.Wrapper>
            <Upload
              name="avatar"
              accept=".png, .jpeg, .jpg"
              listType="picture-circle"
              className="avatar-uploader"
              showUploadList={false}
              beforeUpload={(file) => {
                handleImageUpload(file);
                return false;
              }}
              key={uploadedImage ? uploadedImage.name : "no-image"}
            >
              {user?.profileImage || uploadedImage  ? (
                <Styled.Img
                  img={user?.profileImage ?? URL.createObjectURL(uploadedImage)}
                  alt={user?.firstName}
                />
              ) : (
                <>Upload Photo</>
              )}
            </Upload>
          </Styled.Wrapper>
          <Styled.Section>
            <Styled.Text>{`${user?.firstName} ${user?.lastName}`}</Styled.Text>
            <Styled.Span>{user?.email}</Styled.Span>
          </Styled.Section>
        </Styled.Card>

        <div>
          <Button
            size="large"
            className="btn__icon__gap"
            htmlType="submit"
            loading={isLoading}
          >
            Update Image
          </Button>
          {formik.values.image && (
            <Styled.Wrapper sx="file__upload__info">
              <p className="text-right">{formik.values.image.name}</p>
            </Styled.Wrapper>
          )}
        </div>
      </Styled.Section>
    </form>
  );
};

export default UploadPhotoProfile;
