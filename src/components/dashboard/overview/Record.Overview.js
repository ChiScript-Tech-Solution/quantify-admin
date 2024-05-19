import React, { useEffect, useState } from "react";
import { TransaRecordCard } from "../../../common";
import { Styled } from "../../../constants/Styled";
import { useDispatch, useSelector } from "react-redux";
import { fetchTotalBalance } from "../../../state/slice/balance.Slice";
import { formatAmount } from "../../../utils/Utils";
;

const RecordOverview = () => {
  const dispatch = useDispatch();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { balance } = useSelector((state) => state.balance);

  useEffect(() => {
    dispatch(fetchTotalBalance());
  }, [dispatch]);

  const analytics = balance?.data;

  const record = [
    {
      title: "Total Customer Balance", amount: formatAmount(analytics?.user_balance ? analytics?.user_balance : "0"), rate: "0", current: "0",
    },
    {
      title: "Total Investment", amount: formatAmount(analytics?.user_investments ? analytics?.user_investments : "0"), rate: "0", current: "0",
    },
    {
      title: "Total Loan", amount: formatAmount(analytics?.user_loan ? analytics?.user_loan : "0"), rate: "0", current: "0",
    },
    {
      title: "Total Deposit", amount: formatAmount(analytics?.user_deposit ? analytics?.user_deposit : "0") , rate: "0", current: "0",
    },

    {
      title: "Total Withdrawal", amount: formatAmount(analytics?.user_withdrawal ? analytics?.user_withdrawal : "0") , rate: "0", current: "0",
    },
  ];

  return (
    <>

      <Styled.Wrapper sx="record__grid__wrapper">
        {record.map((item, index) => (
          <TransaRecordCard
            key={index}
            title={item?.title}
            amount={item?.amount}
            rate={item.rate}
            current={item.current}
            collapsed={sidebarCollapsed}
            setCollapsed={setSidebarCollapsed}
          />
        ))}
      </Styled.Wrapper>
    </>
  );
};

export default RecordOverview;
