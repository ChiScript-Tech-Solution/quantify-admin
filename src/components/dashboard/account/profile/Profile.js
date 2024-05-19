import React from "react";
import { Styled } from "../../../../constants/Styled";
import PersonalProfile from "./Personal.Profile";
import ComplaintHelp from "./complain.profile";


const Profile = () => {

  return (
    <div>
      <Styled.Wrapper sx="profile__tap__wrapper">

        <PersonalProfile />

        <Styled.Wrapper sx="help__form border__inner max-w-[25rem]">
          <ComplaintHelp />
        </Styled.Wrapper>
      </Styled.Wrapper>
    </div>
  );
};

export default Profile;
