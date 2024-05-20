import React from "react";
import {
  AcceptInvite,
  ChangePassword,
  Compliance,
  Dashboard,
  ForgotPasswordPage,
  Investment,
  Loan,
  LoginPage,
  Settings,
  Transactions,
} from "./pages";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";

import jwtDecode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "./state/slice/Auth.Slice";
import { ToastContainer } from "react-toastify";

const ProtectedRoute = ({ user, redirect = "/" }) => {
  const dispatch = useDispatch();
  const currentDate = new Date();

  if (!user) {
    return <Navigate to={redirect} replace />;
  }

  const decod_access = jwtDecode(user?.token);

  if (decod_access.exp * 1000 < currentDate.getTime()) {
    dispatch(logoutUser());
    return <Navigate to={redirect} replace />;
  }

  return user && <Outlet />;
};

const App = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact index element={<LoginPage />} />
          <Route path="/admin/forgot/password" exact index element={<ForgotPasswordPage />} />
          <Route path="/set/password/:token" element={<AcceptInvite />} />
          <Route path="/reset/password/" element={<ChangePassword />} />
          <Route element={<ProtectedRoute user={user} redirect="/" />}>
            <Route path="/dashboard/overview" exact element={<Dashboard />} />
            <Route path="/dashboard/customers" exact element={<Compliance />}/>
            <Route path="/dashboard/transactions" exact element={<Transactions />}/>
            <Route path="/dashboard/funds" exact element={<Investment />}/>
            <Route path="/dashboard/withdraws" exact element={<Loan />}/>
            <Route path="/dashboard/settings" exact element={<Settings />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
