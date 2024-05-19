import React, { useEffect, useState } from 'react'
import { Styled } from '../../../../constants/Styled'
import { Button, Modal, Table } from 'antd'
import { ModalTitle } from '../../../../common/Styled/Styled';
import InviteAdmin from './inviteAdmin';
import { inviteAdmin_col } from '../../../../data/inviteAdmin.Data';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminUser } from "../../../../state/slice/admin.Slice";

const UserSecurityAccount = () => {
  const dispatch = useDispatch();
  const [ inviteAdmin, setInviteAdmin ] = useState(false);
  const { adminUser } = useSelector((state) => state.adminUser);

  const handleInvite = () => {
    setInviteAdmin(!inviteAdmin);
  }

  useEffect(() => {
    dispatch(fetchAdminUser())
  }, [dispatch])

  const allAdmin = adminUser?.data?.admin;

  return (
    <>
        <Styled.Wrapper sx="invite__admin__wrapper">
                <Styled.Section sx="left__wrapper">
                    <Styled.Text sx="title">Invite New Admin</Styled.Text>
                    <Styled.Span sx="desc">Invite your team members, collaborate, manage their roles and permissions.</Styled.Span>
                    <Button type='primary' size='large' onClick={handleInvite}>Invite new Team</Button>
                </Styled.Section>
                <Styled.Section sx="right__wrapper">
                <Table
                  columns={inviteAdmin_col}
                  dataSource={allAdmin}
                />
                </Styled.Section>

        </Styled.Wrapper>

        {inviteAdmin && (
          <Modal 
            title={<ModalTitle title="Invite New Member" close={handleInvite} icon="X" />}
            open={inviteAdmin}
            closable={false}
            footer={null}
          >
            <InviteAdmin close={handleInvite}/>
          </Modal>
        )}
    </>
  )
}

export default UserSecurityAccount