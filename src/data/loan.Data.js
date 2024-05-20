import { formatAmount, formatDateAndTime } from "../utils/Utils";

export const getLoansColumns = (isSearchQuery) => {
  const loan_col = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
      filteredValue: [isSearchQuery],
      onFilter: (value, record) => {
        return (
          String(record.id).toLowerCase().includes(value.toLowerCase()) ||
          String(record.amount).toLowerCase().includes(value.toLowerCase()) ||
          String(record.user.phoneNumber).toLowerCase().includes(value.toLowerCase())
        );
      },
    },

    {
      title: "Phone Number",
      dataIndex: "user",
      render: (user) => `${user.countryCode} ${user.phoneNumber}`,
      sorter: (a, b) => a.user.phoneNumber- b.user.phoneNumber,
    },

    {
      title: "Amount",
      dataIndex: "amount",
      render: formatAmount,
      sorter: (a, b) => a.amount - b.amount,
    },

    {
      title: "Reference",
      dataIndex: "reference",
      sorter: (a, b) => a.reference - b.reference,
    },

    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <div className={`status-before-content ${status}`}>
          {status}
        </div>
      ),
      sorter: (a, b) => a.status - b.status,
      align: "center",
    },

    {
      title: "Requested Date",
      dataIndex: "createdAt",
      render: formatDateAndTime,
      sorter: (a, b) => a.createdAt - b.createdAt,
    },
  ];
  return loan_col;
};

export const filterLoanStatus = [
  { value: "", label: "All" },
  { value: "approved", label: "Approved" },
  { value: "declined", label: "Declined" },
  { value: "pending", label: "Pending" },
];

export const removeFilterOption = (options) =>
  options.filter((option) => option.value !== "all");
export const filteredLoanStatus = removeFilterOption(filterLoanStatus);

export const withdraw_data = (data) => [
  {
    label: "Full Name",
    value: data?.withdraw_user?.full_name,
  },

  {
    label: "Phone Number",
    value: data?.withdraw_user?.phone_number,
  },

  {
    label: "Referral Code",
    value: data?.withdraw_user?.refferal_code,
  },

  {
    label: "Level",
    value: data?.withdraw_user?.level,
  },

  {
    label: "Paid",
    value: data?.withdraw?.paid ? "paid" : "Pending",
  },

  {
    label: "Amount",
    value: formatAmount(data?.withdraw?.amount),
  },

  {
    label: "Time / Date",
    value: formatDateAndTime(data?.withdraw?.createdAt),
  },

  {
    label: `Wallet (${data?.withdraw?.wallet})`,
    value:
      data?.withdraw?.wallet === "bank"
        ? data?.bankInfo?.account_number
        : data?.withdraw?.wallet === "erc20"
        ? data?.bankInfo?.usdt_erc20
        : data?.withdraw?.wallet === "trc20" || data?.withdraw?.wallet === "tr20"
        ? data?.bankInfo?.usdt_trc20
        : "N/A",
  },
];
