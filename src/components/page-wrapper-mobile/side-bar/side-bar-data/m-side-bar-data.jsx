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
  Menu,
  Apps,
} from "@mui/icons-material";
import { ROUTES } from "../../../../constants/route-links";

export const MSideBarData = [
  {
    title: "Apps",
    url: ROUTES.apps.url,
    route: ROUTES.apps.route,
    icon: <Apps />,
    group: 1,
    text: "apps",
  },
  {
    title: "Donations",
    url: ROUTES.donations.url,
    route: ROUTES.donations.route,
    icon: <MoneyOutlined />,
    group: 1,
    text: "donations",
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
