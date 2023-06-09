import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router";
import { ROUTES } from "./constants/route-links";
import LandingPage from "./pages/landing/LandingPage";
import Login from "./pages/auth/login/Login";
import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import "react-toastify/dist/ReactToastify.css";

import { ProtectedRoutes } from "./components/protected-routes/ProtectedRoutes";
// import { ProtectedRoutes } from "./components/protected-routes/ProtectedRoutes";
import Reports from "./pages/reports/Reports";
import Bill from "./pages/bill/Bill";
import Profile from "./pages/profile/Profile";
import Payment from "./pages/payment/Payment";
import Admin from "./pages/admin/Admin";
import { API_HANDLER } from "./util/api-handler";
import { ConnectingAirportsOutlined } from "@mui/icons-material";
import { ClientPay } from "./pages/payment/ClientPay";
import { useActivityService } from "./store/slices/activity-slice/activity-service";
import AppsList from "./pages/apps/AppsList";
import ServiceUnvailable from "./pages/service-unavailble/ServiceUnvailable";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_DEV_BASE_URL
    : import.meta.env.VITE_PROD_BASE_URL;
export const API = new API_HANDLER(BASE_URL);

function App() {
  const [count, setCount] = useState(0);
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path={ROUTES.base.route} element={<Login />} />
        <Route path={ROUTES.login.route} element={<Login />} />
        <Route path={ROUTES.pay.route} element={<ClientPay />} />

        <Route element={<ProtectedRoutes />}>
          <Route path={ROUTES.dashboard.route} element={<Dashboard />} />
          <Route path={ROUTES.donations.route} element={<Bill />} />
          <Route path={ROUTES.profile.route} element={<Profile />} />
          <Route path={ROUTES.payment.route} element={<Payment />} />
          <Route path={ROUTES.admin.route} element={<Admin />} />
          <Route path={ROUTES.apps.route} element={<AppsList />} />

          {/* Services Routes */}
          <Route path={ROUTES.reports.route} element={<Reports />} />
          <Route
            path={ROUTES.documentRequest.route}
            element={<ServiceUnvailable />}
          />
          <Route
            path={ROUTES.sendMoney.route}
            element={<ServiceUnvailable />}
          />
          <Route
            path={ROUTES.superMarket.route}
            element={<ServiceUnvailable />}
          />
        </Route>

        {/* External routes */}
        <Route path={ROUTES.admins.route} element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
