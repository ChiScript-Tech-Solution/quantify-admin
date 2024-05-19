import React, { useEffect } from 'react'
import { Styled } from '../../../constants/Styled'
import { ModalTitle } from '../../../common/Styled/Styled'
import { Images } from '../../../constants/Images'
import { Icons } from '../../../constants/Icons'
import { TransaButton } from '../../../common'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAdminUser } from '../../../state/slice/admin.Slice'
import { formatDateAndTime } from '../../../utils/Utils'
import { Link } from 'react-router-dom'


const AdminOverview = () => {
    const dispatch = useDispatch();
    const { adminUser } = useSelector((state) => state.adminUser);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchAdminUser());
    }, [dispatch])

    const allAdmin = adminUser?.data?.admin;
  return (
    <div>
        <Styled.Wrapper sx="admin__overview">
            <ModalTitle title="Admins" icon={<Styled.Linked sx="view__click">View All</Styled.Linked>} sx="pb-5" />

            {allAdmin?.slice(0, 5).map((item) => (
                 <Styled.Wrapper sx="admin__overview__active" key={item.id}>
                 <Styled.Section sx="admin__overview__info">
                     <Styled.Img img={Images.ActiveAdmin} alt="" />
                     <Styled.Card>
                         <Styled.Text>{item.firstName} {item.lastName}</Styled.Text>
                         <Styled.Span>{item.email}</Styled.Span>
                     </Styled.Card>
                 </Styled.Section>
 
                 <Styled.Section sx="admin__overview__status">
                     <Icons.AdminStatusIcon color="#3B6352" />
                     <Styled.Text>{formatDateAndTime(item.createdAt)}</Styled.Text>
                 </Styled.Section>
 
             </Styled.Wrapper>
            ))}
           
           <TransaButton sx="admin__overview__btn" title={<Link to="/dashboard/settings">See All</Link>} disabled={user?.isSuper ? false : true}  />
        </Styled.Wrapper>

    </div>
  )
}

export default AdminOverview