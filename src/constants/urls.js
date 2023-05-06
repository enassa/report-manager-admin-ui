export const END_POINTS = {
  // AUTH
  login: "/api/login",
  register: "/api/v1/auth/register",
  home: "/api/v1/home",
  // ORDER
  getAllReports: "/api/reports",
  downloadReport: "/api/order",
  payForReport: "/api/payReport",

  // PORTFOLIO
  // getAllPortfolio: "/api/v1/portfolio",
  // createPortfolio: "/api/v1/portfolio",
  // getStocksForPortfolio: (portfolioId) => `/api/v1/portfolio/${portfolioId}`,
  // addStockToPortfolio: (portfolioId) => `/api/v1/portfolio/${portfolioId}`,
  // closePortfolio: (portfolioId) => `/api/v1/portfolio/${portfolioId}`,

  // MARKET DATA
  // getMarketData: "https://exchange.matraining.com/pd",
  // getOrderBook: "https://exchange.matraining.com/orderbook",
};
