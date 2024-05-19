
import { configureStore } from '@reduxjs/toolkit';
import { thunk } from "redux-thunk";
import authReducer from "./slice/Auth.Slice";
import transactionsReducer from "./slice/Transactions.Slice";
import customersReducer from "./slice/Customer.Slice";
import singleCustomerReducer from "./slice/SingleCustomer.Slice";
import investmentsReducer from "./slice/Investments.Slice";
import balanceReducer from "./slice/balance.Slice";
import approveRejectReducer from "./slice/approvedRejectKYC.Slice";
import loansReducer from "./slice/Loans.Slice";
import approveRejectLoanReducer from "./slice/approveRejectLoans.Slice";
import forgotPasswordReducer from "./slice/forgotPassword.Auth.Slice";
import inviteAdminReducer from "./slice/inviteAdmin.Slice";
import changePasswordReducer from "./slice/changePassword.Slice";
import acceptInvitesReducer from "./slice/acceptInvite.Slice";
import  newPasswordReducer from "./slice/setNewPassword.Slice";
import adminUserReducer from "./slice/admin.Slice";
import userPhotoReducer from "./slice/uploadPhoto.Slice";
import auditLogReducer from './slice/auditLog.Slice';
import userUpdateReducer from "./slice/updateUser.Auth.Slice";
import singleWithdrawReducer from "./slice/single_withdraw.Slice";
import singleFundingReducer from "./slice/single_funding.Slice";
import approveFundingReducer from "./slice/approve.funding.Slice";
import singleTransactionReducer from "./slice/single_transaction.Slice";
import addWalletReducer from "./slice/add_address.Slice";
import addDeluxReducer from "./slice/addDelux.Slice";
import fundAddressReducer from "./slice/fundingAddress.Slice";
import deleteAddressReducer from "./slice/deleteAddress.Slice";
import updateAddressReducer from "./slice/updateAddress.Slice"
import changeDeluxReducer from "./slice/updateDelux.Slice";
import userDeluxReducer from "./slice/userDelux.Slice";
import removeDeluxReducer from "./slice/removeDelux.Slice";
import approveWithdrawReducer from "./slice/withdrawRequest.Slice"


const store = configureStore ({
    reducer : {
        auth: authReducer,
        transactions: transactionsReducer,
        customers: customersReducer,
        singleCustomer: singleCustomerReducer,
        investments: investmentsReducer,
        balance: balanceReducer,
        approveReject: approveRejectReducer,
        loans: loansReducer,
        approveRejectLoan: approveRejectLoanReducer,
        forgotPassword: forgotPasswordReducer,
        inviteAdmin: inviteAdminReducer,
        changePassword: changePasswordReducer,
        acceptInvites: acceptInvitesReducer,
        newPassword: newPasswordReducer,
        adminUser: adminUserReducer,
        userPhoto: userPhotoReducer,
        auditLog: auditLogReducer,
        userUpdate: userUpdateReducer,
        singleWithdraw: singleWithdrawReducer,
        singleFunding: singleFundingReducer,
        approveFunding: approveFundingReducer,
        singleTransaction: singleTransactionReducer,
        addWallet: addWalletReducer,
        addDelux: addDeluxReducer,
        fundAddress: fundAddressReducer,
        deleteAddress: deleteAddressReducer,
        updateAddress: updateAddressReducer,
        changeDelux: changeDeluxReducer,
        userDelux: userDeluxReducer,
        removeDelux: removeDeluxReducer,
        approveWithdraw: approveWithdrawReducer,
    },

    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: false
    }).concat(thunk),

});


export default store