import { Business, Dashboard, History, Logout } from "@mui/icons-material";
import { ROUTES } from "../../../../constants/route-links";

export const SideBarData = [
  {
    title: "Dashboard",
    url: ROUTES.dashboard.url,
    route: ROUTES.dashboard.route,
    icon: <Dashboard />,
    group: 1,
  },
  {
    title: "Portfolio",
    url: ROUTES.portfolio.url,
    route: ROUTES.portfolio.route,
    icon: <Business />,
    group: 1,
  },
  {
    title: "Trade History",
    url: ROUTES.tradeHistory.url,
    route: ROUTES.tradeHistory.route,
    icon: <History />,

    group: 1,
  },
  {
    title: "Logout",
    url: ROUTES.portfolio.url,
    route: ROUTES.logOut.route,
    icon: <Logout />,
    group: 2,
  },
];
