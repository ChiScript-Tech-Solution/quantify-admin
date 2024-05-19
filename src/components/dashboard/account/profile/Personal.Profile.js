import React, { useState } from 'react'
import {  Modal } from 'antd'
import { useSelector } from 'react-redux';
import { Styled } from '../../../../constants/Styled';
import { ModalTitle } from '../../../../common/Styled/Styled';
import EditPersonalProfile from './EditPersonal.Profile';

const PersonalProfile = () => {
    const { user } = useSelector((state) => state.auth);
    const [ isEditProfile, setIsEditProfile ] = useState(false);

    console.log("user data:", user)


    const handleEditProfile = () => {
      setIsEditProfile(!isEditProfile);
    }
      
  return (
    <div>
         <Styled.Wrapper sx="border__inner mt-5">
          <Styled.Section sx="merchant__overview__header__wrapper mb-[24px]">
            <Styled.Section>
              <Styled.Text sx="info__text">Personal Information</Styled.Text>
            </Styled.Section>
            {/* <Button size="large" onClick={handleEditProfile} className="btn__icon__gap">
              Edit
            </Button> */}
          </Styled.Section>

          {/* first and last name */}
          <Styled.Wrapper sx="profile__wrapper__content">
            <Styled.Section>
              <Styled.Span>First Name</Styled.Span>
              <Styled.Text>{user?.full_name ?? "N/A"}</Styled.Text>
            </Styled.Section>

            <Styled.Section>
              <Styled.Span>Account Number</Styled.Span>
              <Styled.Text sx="">
                {user?.bank_information?.account_number || "N/A"}
              </Styled.Text>
            </Styled.Section>
          </Styled.Wrapper>

          {/* email and phone number */}
          <Styled.Wrapper sx="profile__wrapper__content">
            <Styled.Section>
              <Styled.Span>Referral Code</Styled.Span>
              <Styled.Text>
                {user?.refferal_code || "N/A"}
              </Styled.Text>
            </Styled.Section>

            <Styled.Wrapper>
              <Styled.Span>Phone Number</Styled.Span>
              <Styled.Text>
                {user?.phone_number || "N/A"}
              </Styled.Text>
            </Styled.Wrapper>
          </Styled.Wrapper>

          {/* role and address */}
          <Styled.Wrapper sx="profile__wrapper__content">
            <Styled.Section>
              <Styled.Span>Role</Styled.Span>
              <Styled.Text>
                {user?.is_admin === true ? "Administrator" : "Staff"}
              </Styled.Text>
            </Styled.Section>

            <Styled.Section>
              <Styled.Span >Bank Name</Styled.Span>
              <Styled.Text >
                {user?.bank_information?.bank_name ?? "N/A"}
              </Styled.Text>
            </Styled.Section>
          </Styled.Wrapper>
        </Styled.Wrapper>

        {isEditProfile && (
          <Modal
            title={<ModalTitle title="Edit Personal Profile" close={handleEditProfile} icon="X"  />}
            open={isEditProfile}
            closable={false}
            footer={null}
          >
            <EditPersonalProfile close={handleEditProfile} />
          </Modal>
        )}
    </div>
  )
}

export default PersonalProfile