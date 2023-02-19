import {
  AccountBox,
  Business,
  Dashboard,
  History,
  Logout,
  AccountBalanceWalletOutlined,
  DownloadingOutlined,
  MoneyOutlined,
  AccountBoxOutlined,
  AccountCircleOutlined,
} from "@mui/icons-material";
import { ROUTES } from "../../../../constants/route-links";

export const MSideBarData = [
  {
    title: "Reports",
    url: ROUTES.reports.url,
    route: ROUTES.reports.route,
    icon: <DownloadingOutlined />,
    group: 1,
    text: "reports",
  },
  {
    title: "Bills",
    url: ROUTES.bills.url,
    route: ROUTES.bills.route,
    icon: <MoneyOutlined />,
    group: 1,
    text: "bills",
  },
  {
    title: "Payment",
    url: ROUTES.payment.url,
    route: ROUTES.payment.route,
    icon: <AccountBalanceWalletOutlined />,
    group: 1,
    text: "payment",
  },
  {
    title: "Profile",
    url: ROUTES.profile.url,
    route: ROUTES.profile.route,
    icon: <AccountCircleOutlined />,
    group: 1,
    text: "profile",
  },
  {
    title: "Logout",
    url: ROUTES.base.url,
    route: ROUTES.base.route,
    icon: <Logout />,
    group: 2,
  },
];
