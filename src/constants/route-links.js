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

  request: {
    route: "/request",
    url: "/request",
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
  list: {
    route: "/list",
    url: "/list",
  },
  apps: {
    route: "/apps",
    url: "/apps",
  },
  settings: {
    route: "/settings",
    url: "/settings",
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

// {
//   title: "List",
//   url: ROUTES.apps.url,
//   route: ROUTES.apps.route,
//   icon: <Apps />,
//   group: 1,
//   text: "list",
// },
// {
//   title: "Request",
//   url: ROUTES.donations.url,
//   route: ROUTES.donations.route,
//   icon: <RequestQuote />,
//   group: 1,
//   text: "request",
// },
// {
//   title: "Payment",
//   url: ROUTES.payment.url,
//   route: ROUTES.payment.route,
//   icon: <AccountBalanceWalletOutlined />,
//   group: 1,
//   text: "payment",
// },
// {
//   title: "Actions",
//   url: ROUTES.apps.url,
//   route: ROUTES.apps.route,
//   icon: <Apps />,
//   group: 1,
//   text: "actions",
// },
// {
//   title: "Settings",
//   url: ROUTES.profile.url,
//   route: ROUTES.profile.route,
//   icon: <Settings />,
//   group: 1,
//   text: "profile",
// },

// {
//   title: "Logout",
//   url: ROUTES.base.url,
//   route: ROUTES.base.route,
//   icon: <Logout />,
//   group: 2,
// },
