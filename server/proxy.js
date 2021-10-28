const devProxy = {
  '/api': {
    target: 'https://business.sknetzero.co.kr',
    pathRewrite: { '^/api': '/api' },
    changeOrigin: true
  }
};

const prodProxy = {
  '/api': {
    target: 'https://business.sknetzero.co.kr',
    pathRewrite: { '^/api': '/api' },
    changeOrigin: true
  }
};

module.exports = { devProxy, prodProxy };
