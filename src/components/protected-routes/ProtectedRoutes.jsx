import React from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../../constants/route-links";
import MPageWrapper from "../page-wrapper-mobile/PageWrapperMobile";
// import { useAuthService } from "./../../store-and-services/auth-slice/auth-service";

export function ProtectedRoutes() {
  // const { userIsLoggedIn } = useAuthService();
  const userIsLoggedIn = () => true;
  return userIsLoggedIn() ? (
    <MPageWrapper>
      <Outlet />
    </MPageWrapper>
  ) : (
    <Navigate to={ROUTES.base.url} />
  );
}
