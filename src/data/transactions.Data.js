import { Styled } from "../constants/Styled";
import { formatAmount, formatDateAndTime } from "../utils/Utils";


export const getTransactionColumns = (isSearchQuery) => {
    const trnx_col = [
        {
            title: "S/N",
            dataIndex: "id",
            sorter: (a, b) => a.id - b.id,
            filteredValue: [isSearchQuery],
            onFilter: (value, record) => {
                return (
                    String(record.walletAddress)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                    String(record.status).toLowerCase().includes(value.toLowerCase())
                );
            },
        },

        {
            title: "Type",
            dataIndex: "type",
            sorter: (a, b) => a.type - b.type
        },

        {
            title: "Wallet Address",
            dataIndex: "walletAddress",
            render: (walletAddress) => `${walletAddress ?? "N/A"}`,
            sorter: (a, b) => a.walletAddress - b.walletAddress
        },

        {
            title: "Amount",
            dataIndex: "amount",
            render: formatAmount,
            sorter: (a, b) => a.amount - b.amount,
        },

        {
            title: "Pre Balance",
            dataIndex: "preBalance",
            render: formatAmount,
            sorter: (a, b) => a.preBalance - b.preBalance,
        },

        {
            title: "Post Balance",
            dataIndex: "postBalance",
            render: formatAmount,
            sorter: (a, b) => a.postBalance - b.postBalance,
        },

        {
            title: "description",
            dataIndex: "description",
            sorter: (a, b) => a.description - b.description,
        },

        {
            title: "Status",
            dataIndex: "status",
            render: (status) => <Styled.Span sx={`status-before-content ${status}`}>{status}</Styled.Span>,
            sorter: (a, b) => a.status - b.status,
        },

        {
            title: "Time / Date",
            dataIndex: "createdAt",
            render: formatDateAndTime,
            sorter: (a, b) => a.createdAt - b.createdAt,
        }
    ]

    return trnx_col;
}


export const tranx_data = (data) => [
    {
        label: "Full Name",
        value: data?.transaction_user?.full_name
    },

    {
        label: "Phone Number",
        value: data?.transaction_user?.phone_number
    },

    {
        label: "Referral Code",
        value: data?.transaction_user?.refferal_code
    },

    {
        label: "Level",
        value: data?.transaction_user?.level
    },

    {
        label: "Currency Type",
        value: data?.transaction?.currency_type
    },

    {
        label: "Narration",
        value: data?.transaction?.narration
    },

    {
        label: "Transaction Type",
        value: data?.transaction?.transaction_type
    },

    {
        label: "Status",
        value: <span className={`status-before-content ${data?.transaction_user?.is_approved ? "Approved" : "Pending"}`}>{data?.transaction_user?.is_approved ? "Approved" : "Pending"}</span>
    },

    {
        label: "Amount",
        value: formatAmount(data?.transaction?.amount)
    },

    {
        label: "Pre Balance",
        value: formatAmount(data?.transaction?.pre_balance)
    },

    {
        label: "Post Balance",
        value: formatAmount(data?.transaction?.post_balance)
    },

    {
        label: "Time / Date",
        value: formatDateAndTime(data?.transaction?.createdAt)
    },
]