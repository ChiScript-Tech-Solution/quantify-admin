

export const getCustomersColumns  = [

  {
    title: "Nick Name",
    dataIndex: "profile",
    render: (profile) => `${profile.nickName}`,
    sorter: (a, b) => a.profile.nickName - b.profile.nickName,
  },


  {
    title: "Invitation Code",
    dataIndex: "profile",
    render: (profile) => `${profile.invitationCode}`,
    sorter: (a, b) => a.profile.invitationCode - b.profile.invitationCode
  },


  {
    title: "Email Address",
    dataIndex: "profile",
    render: (profile) => `${profile.email ?? "N/A"}`,
    sorter: (a, b) => a.profile.email - b.profile.email
  },

  {
    title: "Gender",
    dataIndex: "profile",
    render: (profile) => `${profile.gender ?? "N/A"}`,
    sorter: (a, b) => a.profile.gender - b.profile.gender
  },



];



export const filterUserOptions = [
  { value: null, label: "All" },
  { value: "verified", label: "Verified" },
  { value: "rejected", label: "Rejected" },
  { value: "pending", label: "Pending" },
];

export const removeFilterOption = (options) => options.filter(option => option.value !== "all");
export const filteredUserOptions = removeFilterOption(filterUserOptions);




export const filterOptions = [
  { value: null, label: "All" },
  { value: true, label: "Verified" },
  { value: false, label: "Pending" },
];



export const merch__data = [
  {
    title: "CAC Registration No.",
    desc: "RC 141232526",
  },

  {
    title: "Business Description",
    desc: "@Techbooks",
  },
  {
    title: "Country/Region",
    desc: "Nigeria",
  },

  {
    title: "Business Address",
    desc: "Shop 14, Elevate Plaza, Garki, Area 1, Abuja",
  },

  {
    title: "State/Region",
    desc: "Federal Capital Territory",
  },
  {
    title: "LGA",
    desc: "Gwagwalada",
  },
  {
    title: "ZIP/Postal",
    desc: "100004",
  },
];

export const merch__seller__data = [
  {
    title: "Country/Region",
    desc: "Nigeria",
  },

  {
    title: "State/Region",
    desc: "Federal Capital Territory",
  },

  {
    title: "LGA",
    desc: "Gwagwalada",
  },

  {
    title: "Account Name",
    desc: "@Techbooks",
  },

  {
    title: "Account Number",
    desc: "0123456789",
  },

  {
    title: "Bank",
    desc: "Providus Bank",
  },

  {
    title: "BVN",
    desc: "345565645636",
  },
];

export const merch__doc = [
  {
    title: "All Delux",
  },

  {
    title: "Add Delux",
  },

];


export const deluxOptions = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
  { value: 6, label: "6" },
  { value: 7, label: "7" },
  { value: 8, label: "8" },
  { value: 9, label: "9" },
  { value: 10, label: "10" },
  { value: 11, label: "11" },
  { value: 12, label: "12" },
  { value: 13, label: "13" },
  { value: 14, label: "14" },
  { value: 15, label: "15" },
  { value: 16, label: "16" },
  { value: 17, label: "17" },
  { value: 18, label: "18" },
  { value: 19, label: "19" },
  { value: 20, label: "20" },
  { value: 21, label: "21" },
  { value: 22, label: "22" },
  { value: 23, label: "23" },
  { value: 24, label: "24" },
  { value: 25, label: "25" },
  { value: 26, label: "26" },
  { value: 27, label: "27" },
  { value: 28, label: "28" },
  { value: 29, label: "29" },
  { value: 30, label: "30" },
];


export const deluxSet = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
];