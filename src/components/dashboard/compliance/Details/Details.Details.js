import React, { useEffect } from 'react'
import { Styled } from '../../../../constants/Styled'
import { Icons } from '../../../../constants/Icons'
import { TransaDesc } from '../../../../common'
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleCustomers } from '../../../../state/slice/SingleCustomer.Slice';
import { ModalTitle } from '../../../../common/Styled/Styled';


const DetailsDetails = ({ customerId, phoneNumber, close }) => {
    const dispatch = useDispatch();
    const { singleCustomer } = useSelector((state) => state.singleCustomer);

    useEffect(() => {
        dispatch(fetchSingleCustomers({
            phoneNumber: phoneNumber,
            countryCode: customerId
        }));
    }, [dispatch, customerId, phoneNumber])

    const cusDetail = singleCustomer?.data;


    return (
        <>
            <Styled.Wrapper sx="merchant__details__wrapper">
                <div className='flex justify-between items-center'>
                    <Styled.Section sx="merchant__details__header">
                        <Styled.Text sx="merchant__name">@{cusDetail?.profile?.nickName}</Styled.Text>
                        <Styled.Text sx="merchant__status">Status: <Styled.Span sx={`status-before-content ${cusDetail?.policy ? "Approved" : "Pending"}`}>{cusDetail?.policy ? "Approved" : "Pending"}</Styled.Span></Styled.Text>
                    </Styled.Section>
                    <ModalTitle close={close} icon="X" />
                </div>

                <Styled.Section sx="merchant__details__header pt-[8px]">
                    <Styled.Text sx="merchant__address"><Icons.EmailIcon /> {cusDetail?.profile?.email ?? "N/A"}</Styled.Text>
                    <Styled.Text sx="merchant__address"><Icons.CallIcon /> {cusDetail?.profile?.invitationCode ?? "N/A"}</Styled.Text>
                </Styled.Section>

                <Styled.Section sx="pt-[1rem]">
                    <TransaDesc title="Email Address" desc={cusDetail?.profile?.email ?? "N/A"} />
                    <TransaDesc title="Gender" desc={cusDetail?.profile?.gender ?? "N/A"} />
                    <TransaDesc title="Flexible Balance" desc={cusDetail?.wallet?.flexibleBalance ?? "N/A"} />
                    <TransaDesc title="Pending Funds" desc={cusDetail?.wallet?.pendingFunds ?? "N/A"} />
                    <TransaDesc title="Today Earnings" desc={cusDetail?.wallet?.todayEarnings ?? "N/A"} />
                    <TransaDesc title="Total Withdrawal" desc={cusDetail?.wallet?.totalWithdrawal ?? 0} />
                    <TransaDesc title="Total Recharge" desc={cusDetail?.wallet?.totalRecharge ?? "N/A"} />
                    <TransaDesc title="newEarnings" desc={cusDetail?.refStat?.newEarnings ?? "N/A"} />
                    <TransaDesc title="newMembers" desc={cusDetail?.refStat?.newMembers ?? "N/A"} />
                    <TransaDesc title="teamSize" desc={cusDetail?.refStat?.teamSize ?? "N/A"} />
                    <TransaDesc title="totalLevelOneUser" desc={cusDetail?.refStat.totalLevelOneUser ?? "N/A"} />
                    <TransaDesc title="totalLevelOneEarnings" desc={cusDetail?.refStat?.totalLevelOneEarnings ?? "N/A"} />
                    <TransaDesc title="totalLevelTwoUser" desc={cusDetail?.refStat.totalLevelTwoUser ?? "N/A"} />
                    <TransaDesc title="totalLevelTwoEarnings" desc={cusDetail?.refStat?.totalLevelTwoEarnings ?? "N/A"} />
                    <TransaDesc title="totalLevelThreeUser" desc={cusDetail?.refStat.totalLevelThreeUser ?? "N/A"} />
                    <TransaDesc title="totalLevelThreeEarnings" desc={cusDetail?.refStat?.totalLevelThreeEarnings ?? "N/A"} />
                </Styled.Section>


            </Styled.Wrapper>
        </>
    )
}

export default DetailsDetails