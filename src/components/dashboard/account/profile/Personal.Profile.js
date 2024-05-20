import React, { useState } from 'react'
import {  Modal } from 'antd'
import { useSelector } from 'react-redux';
import { Styled } from '../../../../constants/Styled';
import { ModalTitle } from '../../../../common/Styled/Styled';
import EditPersonalProfile from './EditPersonal.Profile';

const PersonalProfile = () => {
    const { user } = useSelector((state) => state.auth);
    const [ isEditProfile, setIsEditProfile ] = useState(false);


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
              <Styled.Span>Email</Styled.Span>
              <Styled.Text>{user?.profile?.email ?? "N/A"}</Styled.Text>
            </Styled.Section>

            <Styled.Section>
              <Styled.Span>Gender</Styled.Span>
              <Styled.Text sx="">
                {user?.profile?.gender || "N/A"}
              </Styled.Text>
            </Styled.Section>
          </Styled.Wrapper>

          {/* email and phone number */}
          <Styled.Wrapper sx="profile__wrapper__content">
            <Styled.Section>
              <Styled.Span>Referral Code</Styled.Span>
              <Styled.Text>
                {user?.profile?.invitationCode || "N/A"}
              </Styled.Text>
            </Styled.Section>

            <Styled.Wrapper>
              <Styled.Span>Phone Number</Styled.Span>
              <Styled.Text>
                {user?.profile?.nickName || "N/A"}
              </Styled.Text>
            </Styled.Wrapper>
          </Styled.Wrapper>

          {/* role and address */}
          <Styled.Wrapper sx="profile__wrapper__content">
            <Styled.Section>
              <Styled.Span>Level</Styled.Span>
              <Styled.Text>
                {user?.level?.levelName ?? "N/A"}
              </Styled.Text>
            </Styled.Section>

            <Styled.Section>
              <Styled.Span >Earnings</Styled.Span>
              <Styled.Text >
                {user?.wallet?.todayEarnings ?? "N/A"}
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