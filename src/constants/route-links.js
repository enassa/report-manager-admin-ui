export const ROUTES = {
  // =============== BASE ROUTE ===============
  base: {
    route: "/",
    url: "/",
  },

  // =============== AUTH ROUTES ===============
  auth: {
    route: "/auth",
    url: "/auth",
  },
  login: {
    route: "/login",
    url: "/login",
  },
  register: {
    route: "/register",
    url: "/register",
  },
  forgotPassword: {
    route: "/forgot-password",
    url: "/forgot-password",
  },
  resetPassword: {
    route: "/reset-password",
    url: "/reset-password",
  },
  profile: {
    route: "/profile",
    url: "/profile",
  },

  //===============  PROTECTED ROUTES ===============
  reports: {
    route: "/reports",
    url: "/reports",
  },
  bills: {
    route: "/bills",
    url: "/bills",
  },
  payment: {
    route: "/payment",
    url: "/payment",
  },
  dashboard: {
    route: "/dashboard",
    url: "/dashboard",
  },
  pay: {
    route: "/pay",
    url: "/pay",
  },

  //===============  ADMIN ROUTES ===============
  admin: {
    route: "/admin",
    url: "/admin",
  },
  admins: {
    route: "/admins",
    url: "/admins",
  },

  notFound: "*",
};
