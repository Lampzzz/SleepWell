import "./assets/style/global.css";
import "./assets/style/auth.css";
import "./assets/style/dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import { store } from "./services/redux/store";

// Landing Page
import Home from "./pages/layout/home/Home";
import AboutUs from "./pages/layout/about/AboutUs";
import ContactUs from "./pages/layout/contact/ContactUs";
import FreqQuestion from "./pages/layout/question/FreqQuestion";

// Private Route
import AdminRoute from "./pages/auth/route/AdminRoute";
import UserRoute from "./pages/auth/route/UserRoute";
import SuperRoute from "./pages/auth/route/SuperRoute";

// Authentication
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPass from "./pages/auth/ForgotPass";
import ResetPass from "./pages/auth/ResetPass";
import OTPVerification from "./pages/auth/OTPVerification";

// Admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserAccount from "./pages/admin/UserAccount";
import AdminRecord from "./pages/admin/AdminRecord";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminPassword from "./pages/admin/AdminPassword";
import EditUserAccount from "./pages/admin/EditUserAccount";

// User
import UserDashboard from "./pages/user/UserDashboard";
import Session from "./pages/user/Session";
import UserRecord from "./pages/user/UserRecord";
import UserProfile from "./pages/user/UserProfile";
import UserPassword from "./pages/user/UserPassword";
import UserReminder from "./pages/user/UserReminder";

// Super Admin
import AdminAccount from "./pages/super/AdminAccount";
import CreateAdmin from "./pages/super/CreateAdmin";
import SuperProfile from "./pages/super/SuperProfile";
import SuperPassword from "./pages/super/SuperPassword";
import EditAdminAccount from "./pages/super/EditAdminAccount";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/freq-question" element={<FreqQuestion />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPass />} />
      <Route path="/reset-password" element={<ResetPass />} />
      <Route path="/verify-otp" element={<OTPVerification />} />

      <Route path="/admin" element={<AdminRoute />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="user-account" element={<UserAccount />} />
        <Route path="user-record" element={<AdminRecord />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="password" element={<AdminPassword />} />
        <Route path="edit-user/:id" element={<EditUserAccount />} />
      </Route>

      <Route path="/user" element={<UserRoute />}>
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="session" element={<Session />} />
        <Route path="record" element={<UserRecord />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="password" element={<UserPassword />} />
        <Route path="reminder" element={<UserReminder />} />
      </Route>

      <Route path="/super" element={<SuperRoute />}>
        <Route path="admin-account" element={<AdminAccount />} />
        <Route path="create" element={<CreateAdmin />} />
        <Route path="edit-admin/:id" element={<EditAdminAccount />} />
        <Route path="profile" element={<SuperProfile />} />
        <Route path="password" element={<SuperPassword />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
