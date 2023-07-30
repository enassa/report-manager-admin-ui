import React from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../../constants/route-links";
import { useAuthService } from "../../store/slices/auth-slice/auth-service";
import MPageWrapper from "../page-wrapper-mobile/PageWrapperMobile";

export function ProtectedRoutes() {
  const { userIsLoggedIn } = useAuthService();
  return userIsLoggedIn() ? (
    <MPageWrapper>
      <Outlet />
    </MPageWrapper>
  ) : (
    <Navigate to={ROUTES.base.url} />
  );
  // return (
  //   <MPageWrapper>
  //     <Outlet />
  //   </MPageWrapper>
  // );
}
