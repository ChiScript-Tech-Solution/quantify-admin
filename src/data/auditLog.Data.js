import { formatDateAndTime } from "../utils/Utils";



export const getAuditLogsColumns = (isSearchQuery) => {
    const audit_col = [
        {
            title: "ID",
            dataIndex: "id",
            sorter: (a, b) => a.id === b.id
        },

        {
            title: "Email",
            dataIndex: "email",
            sorter: (a, b) => a.id === b.id
        },

        {
            title: "First Name",
            dataIndex: "firstName",
            sorter: (a, b) => a.id === b.id
        },

        {
            title: "Last Name",
            dataIndex: "lastName",
            sorter: (a, b) => a.id === b.id
        },


        {
            title: "Action",
            dataIndex: "action",
            sorter: (a, b) => a.id === b.id
        },


        {
            title: "Date",
            dataIndex: "createdAt",
            render: formatDateAndTime,
            sorter: (a, b) => a.id === b.id,
            filteredValue: [isSearchQuery],
            onFilter: (value, record) => {
              return (
                String(record.createdAt)
                  .toLowerCase()
                  .includes(value.toLowerCase()) ||
                String(record.email).toLowerCase().includes(value.toLowerCase())
              );
            },
        },
    ]

    return audit_col
}