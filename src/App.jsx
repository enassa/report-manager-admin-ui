import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router";
import { ROUTES } from "./constants/route-links";
import Login from "./pages/auth/login/Login";
import "react-toastify/dist/ReactToastify.css";
import { ProtectedRoutes } from "./components/protected-routes/ProtectedRoutes";
import { API_HANDLER } from "./util/api-handler";
import List from "./pages/list/List";
import Uploads from "./pages/uploads/Uploads";
import { BASE_URL } from "./constants/ui-data";
import Register from "./pages/auth/register/Register";
// import LandingPage from "./pages/landing/LandingPage";
// import Admin from "./pages/admin/Admin";
// import Home from "./pages/home/Home";
// import Dashboard from "./pages/dashboard/Dashboard";

// import { ProtectedRoutes } from "./components/protected-routes/ProtectedRoutes";
// import Bill from "./pages/bill/Bill";
// import Profile from "./pages/profile/Profile";
// import Payment from "./pages/payment/Payment";
// import { ConnectingAirportsOutlined } from "@mui/icons-material";
// import { ClientPay } from "./pages/payment/ClientPay";
// import { useActivityService } from "./store/slices/activity-slice/activity-service";
// import AppsList from "./pages/apps/AppsList";
// import ServiceUnvailable from "./pages/service-unavailble/ServiceUnvailable";

export const API = new API_HANDLER(BASE_URL);

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path={ROUTES.base.route} element={<Login />} />
        <Route path={ROUTES.login.route} element={<Login />} />
        <Route path={ROUTES.register.route} element={<Register />} />
        {/* <Route path={ROUTES.pay.route} element={<ClientPay />} /> */}

        <Route element={<ProtectedRoutes />}>
          {/* <Route path={ROUTES.dashboard.route} element={<Dashboard />} /> */}
          <Route path={ROUTES.uploads.route} element={<Uploads />} />
          {/* <Route path={ROUTES.request.route} element={<Bill />} /> */}
          {/* <Route path={ROUTES.settings.route} element={<Profile />} /> */}
          {/* <Route path={ROUTES.payment.route} element={<Payment />} /> */}
          {/* <Route path={ROUTES.admin.route} element={<Admin />} /> */}
          {/* <Route path={ROUTES.apps.route} element={<AppsList />} /> */}
          <Route path={ROUTES.list.route} element={<List />} />

          {/* Services Routes */}
          {/* <Route
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
          /> */}
        </Route>

        {/* External routes */}
        {/* <Route path={ROUTES.admins.route} element={<Admin />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
