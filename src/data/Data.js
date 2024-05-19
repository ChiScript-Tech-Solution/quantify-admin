

import { Icons } from '../constants/Icons';

export const menuItems = [
    // {
    //     icon: <Icons.DashboardIcon style={{ fontSize: "32px"}} />,
    //     title: "Dashboard",
    //     link: "/dashboard/overview"
    // },
    {
        icon: <Icons.ComplianceIcon />,
        title: "Customers",
        link: "/dashboard/customers"
    },

    {
        icon: <Icons.TransactionsIcon />,
        title: "Transactions",
        link: "/dashboard/transactions"
    },

    {
        icon: <Icons.CustomersIcon />,
        title: "Funds",
        link: "/dashboard/funds"
    },

    {
        icon: <Icons.CustomersIcon />,
        title: "Withdraws",
        link: "/dashboard/withdraws"
    },

    {
        icon: <Icons.SettingIcon />,
        title: "Settings",
        link: "/dashboard/settings"
    },

]


export const noData = <div className="flex justify-center items-center w-full mx-auto mt-10">No Delux Available, Please add delux</div>
