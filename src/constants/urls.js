export const END_POINTS = {
  // AUTH
  login: "/api/login",
  register: "/api/v1/auth/register",
  home: "/api/v1/home",
  // ORDER
  getAllOrders: "/api/v1/order",
  updateOrder: "/api/v1/order",
  createOrder: (portfolioId) => `/api/v1/order/${portfolioId}`,
  getOneOrder: (orderId) => `/api/v1/order/${orderId}`,
  cancelOrder: (orderId) => `/api/v1/order/${orderId}`,

  // PORTFOLIO
  getAllPortfolio: "/api/v1/portfolio",
  createPortfolio: "/api/v1/portfolio",
  getStocksForPortfolio: (portfolioId) => `/api/v1/portfolio/${portfolioId}`,
  addStockToPortfolio: (portfolioId) => `/api/v1/portfolio/${portfolioId}`,
  closePortfolio: (portfolioId) => `/api/v1/portfolio/${portfolioId}`,

  // MARKET DATA
  getMarketData: "https://exchange.matraining.com/pd",
  getOrderBook: "https://exchange.matraining.com/orderbook",
};
