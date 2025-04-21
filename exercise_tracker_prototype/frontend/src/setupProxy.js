const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    console.log("proxy being loaded!");
  app.use(
    '/server',
    createProxyMiddleware({
      target: 'http://localhost:4000',
      changeOrigin: true,
    })
  );
};
