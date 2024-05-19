export const inviteAdmin_col = [
    {
      title: "First Name",
      dataIndex: "firstName",
    },
  
    {
      title: "Last Name",
      dataIndex: "lastName",
    },
  
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
    },
  
    {
      title: "Email Address",
      dataIndex: "email",
    },
  
    {
      title: "Nationality",
      dataIndex: "nationality",
      render: nationality => `${nationality ? nationality : "N/A"}`
    },
  
    {
      title: "State",
      dataIndex: "state",
      render: state => `${state ? state : "N/A"}`
    },
  
    {
      title: "City",
      dataIndex: "city",
      render: city => `${city ? city : "N/A"}`
    },
  
    {
      title: "Gender",
      dataIndex: "gender",
      render: gender => `${gender ? gender : "N/A"}`
    },
  ];
  