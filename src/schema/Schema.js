import * as yup from "yup";

export const registerSchema = yup.object({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  phoneNumber: yup.string().required("Phone Number is required"),
  address: yup.string().required("Address is required"),
  password: yup.string().required("Password is required"),
  confirm_password: yup.string().required("Password do not match "),
});

export const kycSchema = yup.object({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("First Name is required"),
  phoneNumber: yup.string().required("Phone Number is required"),
  address: yup.string().required("Address is required"),
  permanentAddress: yup.string().required("Permanent Address is required"),
  nationality: yup.string().required("Nationality is required"),
  state: yup.string().required("State is required"),
  accountNumber: yup.string().required("Account Number is required"),
  bankName: yup.string().required("Bank Name is required"),
  city: yup.string().required("City is required"),
  gender: yup.string().required("Gender is required"),
  bvn: yup.string().required("BVN is required"),
  profileImage: yup
    .mixed()
    .required("Profile Photo is required (.jpg, .png)")
    .test(
      "fileFormat",
      "Invalid file format. Only .jpg and .png allowed.",
      (value) => value && ["image/jpeg", "image/png"].includes(value.type)
    ),
    identificationImage: yup
    .mixed()
    .required("Means of Identification is required (.jpg, .png)")
    .test(
      "fileFormat",
      "Invalid file format. Only .jpg and .png allowed.",
      (value) => value && ["image/jpeg", "image/png"].includes(value.type)
    ),
});

export const loginSchema = yup.object({
  countryCode: yup.string().required("Country Code is required"),
  phoneNumber: yup.string().required("Phone Number is required"),
  password: yup.string().required("Password is required"),
});

export const passwordResetSchema = yup.object({
  email: yup.string().required("Email is required").email(),
});

export const cardGenerateSingleSchema = yup.object({
  cardName: yup.string().required("Card Name is required"),
  contactNumber: yup.string().required("Phone Number is required"),
  amount: yup.string().required("Amount is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
});

export const physicalSchema = yup.object({
  voucher_card_number: yup.string().required("Voucher Number is required"),
  amount: yup.string().required("Amount is required"),
});

export const otpSchema = yup.object({
  code: yup.string().required("OTP is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  newPassword: yup.string().required("Password is required"),
});

export const changePasswordSchema = yup.object({
  oldPassword: yup.string().required("Old Password is required"),
  newPassword: yup.string().required("Enter New Password"),
});

export const loanRequestSchema = yup.object({
  loanAmount: yup.string().required("Amount is required"),
  loanPurpose: yup.string().required("Purpose is required"),
  description: yup.string().required("Description is required"),
  amountWord: yup.string().required("Amount is required"),
  requestDate: yup.string().required("Date is required"),
});

export const loanCollateralSchema = yup.object({
  witnessEmail: yup.string().email("Invalid email address").required("Email is required"),
  witnessFullName: yup.string().required("Full Name is required"),
  witnessPhone: yup.string().required("Phone Number is required"),
  image: yup.mixed().required("Means of Identification is required (.jpg, .png)").test(
      "fileFormat",
      "Invalid file format. Only .jpg and .png allowed.",
      (value) => value && ["image/jpeg", "image/png"].includes(value.type)
    ),
});


export const startInvestmentSchema = yup.object({
  investmentAmount: yup.string().required("Investment Amount in Words is required"),
  investmentPurpose: yup.string().required("Investment Purpose is required"),
  amountWord: yup.string().required("Amount is required"),
  requestDate: yup.string().required("Date is required"),
});

export const fundWalletSchema = yup.object({
  amount: yup.string().required("Amount is required"),
});


export const fundInvestmentSchema = yup.object({
  investment_id: yup.string().required("Investment ID is required"),
});


export const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
});


export const inviteAdminSchema = yup.object({
  email: yup.string().email("Invalid email address").required("Email is required"),
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  phoneNumber: yup.string().required("Phone Number is required"),
});

export const acceptInviteSchema = yup.object({
  otp: yup.string().required("Verification Code is required"),
  email: yup.string().required("Email is required"),
  password:  yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one digit, and one special character."
    ),
  confirm_password:  yup
  .string()
  .required("Password confirmation is required")
  .oneOf([yup.ref('password'), null], "Password do not match"),
});


export const updateCustomerSchema = yup.object({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  phoneNumber: yup.string().required("Phone Number is required"),
  address: yup.string().required("Address is required"),
  nationality: yup.string().required("Nationality is required"),
  state: yup.string().required("State is required"),
  city: yup.string().required("City is required"),
  gender: yup.string().required("Gender is required"),
});


export const userUpdateSchema = yup.object({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  phoneNumber: yup.string().required("Phone Number is required"),
  address: yup.string().required("Address is required"),
  nationality: yup.string().required("Nationality is required"),
  state: yup.string().required("State is required"),
  city: yup.string().required("City is required"),
  gender: yup.string().required("Gender is required"),
});


export const addWalletSchema = yup.object({
  name: yup.string().required("Name is required"),
  address: yup.string().required("Address is required"),
  mainnet: yup.string().required("Mainnet is required"),
});


export const schema = {
  registerSchema,
  loginSchema,
  passwordResetSchema,
  cardGenerateSingleSchema,
  physicalSchema,
  otpSchema,
  changePasswordSchema,
  kycSchema,
  loanRequestSchema,
  loanCollateralSchema,
  startInvestmentSchema,
  fundWalletSchema,
  fundInvestmentSchema,
  forgotPasswordSchema,
  inviteAdminSchema,
  acceptInviteSchema,
  updateCustomerSchema,
  userUpdateSchema,
  addWalletSchema 
};
