import { AuditLog, Profile, UserSecurityAccount } from "../components";

export const options = [
  {
    key: 1,
    label: "PROFILE",
    children: <Profile />
  },

  {
    key: 2,
    label: "INVITE",
    children: <UserSecurityAccount />
  },

  {
    key: 4,
    label: "AUDIT LOG",
    children: <AuditLog />,
  },
];

