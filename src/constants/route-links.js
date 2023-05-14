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

  //===============  PROTECTED ROUTES ===============

  donations: {
    route: "/donations",
    url: "/donations",
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
  apps: {
    route: "/apps",
    url: "/apps",
  },
  profile: {
    route: "/profile",
    url: "/profile",
  },

  //===============  SERVICE/APPS ROUTES ===============
  reports: {
    route: "/apps/reports",
    url: "/apps/reports",
  },
  superMarket: {
    route: "/apps/market",
    url: "/apps/market",
  },
  documentRequest: {
    route: "/apps/documents",
    url: "/apps/documents",
  },
  sendMoney: {
    route: "/apps/send-money",
    url: "/apps/send-money",
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
