import loginSvg from "./tradesvg.svg";
import { ReactComponent as SVGImage } from "./BgSVG.svg";
import { ReactComponent as LadySvg } from "./ladySvg.svg";
import { ReactComponent as SpinTarget } from "./targetArrowSVG.svg";
import { ReactComponent as NoData } from "./noData.svg";
import { ReactComponent as NoReport } from "./NoReports.svg";
import { ReactComponent as NoTransaction } from "./Transactions.svg";
import { ReactComponent as ServiceInProgress } from "./ServiceInProgress.svg";
import { ReactComponent as StatsReport } from "./statsreport.svg";

export const svgs = {
  loginSvg: <SVGImage className="" />,
  ladySvg: <LadySvg className="" />,
  spinTarget: <SpinTarget className="" />,
  noData: <NoData className="w-full h-full" />,
  NoReport: <NoReport className="w-full h-full" />,
  NoTransaction: <NoTransaction className="w-full h-full" />,
  ServiceInProgress: <ServiceInProgress className="w-full h-full" />,
  statsReport: <StatsReport className="w-[80%] h-[80%]" />,
};
