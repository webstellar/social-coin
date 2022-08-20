const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/v1",
    createProxyMiddleware({
      target: `https://grati-tude.herokuapp.com/`,
      changeOrigin: true,
    })
  );

  app.listen(3000);
};

//"proxy": ""proxy": "https://grati-tude.herokuapp.com/",
