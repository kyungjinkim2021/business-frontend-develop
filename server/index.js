const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const next = require('next');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handler = app.getRequestHandler();

const sampleProxy = {
  target: 'https://business.sknetzero.co.kr',
  pathRewrite: { '^/api': '' },
  changeOrigin: true
};

app.prepare().then(() => {
  const server = express();
  const port = process.env.PROXY_PORT;

  if (process.env.STATIC_PATH) {
    app.setAssetPrefix(process.env.STATIC_PATH);
  }
  server.use('/api', createProxyMiddleware(sampleProxy));

  server.use(express.static(path.join(__dirname, '../public/static')));
  server.all('*', (req, res) => handler(req, res));
  server.listen(port);

  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? 'development' : process.env.NODE_ENV
    }`
  );
});
