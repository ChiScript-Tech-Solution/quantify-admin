// InvestmentColumns.js

import { formatAmount, formatDateAndTime } from "../utils/Utils";
const apiUrl = window.location.hostname

export const getInvestmentColumns = (isSearchQuery) => {
    
  const invest_col = [
    {
      title: "S/N",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
    },

    {
      title: "Receipt",
      dataIndex: "receipt",
      render: (receipt) => <img src={`${apiUrl}/` + receipt} alt="" width={40} height={40} style={{ borderRadius: "50%"}} />,
      sorter: (a, b) => a.receipt - b.receipt,
    },

    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name - b.name,
      filteredValue: [isSearchQuery],
      onFilter: (value, record) => {
        return (
          String(record.status)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.amount).toLowerCase().includes(value.toLowerCase()) ||
          String(formatDateAndTime(record.createdAt)).toLowerCase().includes(value.toLowerCase())
        );
      },
    },

    {
      title: "Main Net",
      dataIndex: "mainnet",
      sorter: (a, b) => a.mainnet - b.mainnet,
    },

    {
      title: "Amount",
      dataIndex: "amount",
      render: formatAmount,
      sorter: (a, b) => a.amount - b.amount,
    },

    {
      title: "Phone Number",
      dataIndex: "user",
      render: (user) => `${user.countryCode} ${user.phoneNumber}`,
      sorter: (a, b) => a.user.phoneNumber - b.user.phoneNumber,
    },


    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <div
          className={`status-before-content ${
            status
          }`}
        >
          {status}
        </div>
      ),
      sorter: (a, b) => a.is_approved - b.is_approved,
      align: "center",
    },

    {
      title: "Time / Date",
      dataIndex: "createdAt",
      render: formatDateAndTime,
      sorter: (a, b) => a.createdAt - b.createdAt,
    },
  ];

  return invest_col;
};




export const filterOptions = [
  { value: null, label: "All" },
  { value: true, label: "Verified" },
  { value: false, label: "Pending" },
];


export const removeFilterOption = (options) => options.filter(option => option.value !== "all");
export const filteredOptions = removeFilterOption(filterOptions);



export const funding_data = (data) => [
  {
      label: "Full Name",
      value: data?.funding_user?.full_name
  },

  {
      label: "Phone Number",
      value: data?.funding_user?.phone_number
  },

  {
      label: "Referral Code",
      value: data?.funding_user?.refferal_code
  },

  {
      label: "Level",
      value: data?.funding_user?.level
  },

  {
    label: "Currency Type",
    value: data?.funding?.currency_type
},


{
  label: "Delux",
  value: data?.funding?.is_delux ? "Yes, Delux" : "No, Other"
},


{
  label: "Funding Proof",
  value: <a download href={data?.funding?.fundProof}><img src={data?.funding?.fundProof} alt="" width={100} height={50}/></a>
},

  {
      label: "Status",
      value: <span className={`status-before-content ${data?.funding?.is_approved ? "Approved" : "Pending"}`}>{data?.funding?.is_approved ? "Approved" : "Pending"}</span>
  },

  {
      label: "Amount",
      value: formatAmount(data?.funding?.amount)
  },

  {
      label: "Time / Date",
      value: formatDateAndTime(data?.funding?.createdAt)
  },
]
