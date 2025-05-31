// craco.config.js
const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@pages': path.resolve(__dirname, 'src/pages/index'),
      '@components': path.resolve(__dirname, 'src/components/index'),
      '@container': path.resolve(__dirname, 'src/container/index'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@images': path.resolve(__dirname, 'src/assets/images'),
      '@css': path.resolve(__dirname, 'src/assets/css'),
      '@utils': path.resolve(__dirname, 'src/utils')
    }
  },
    devServer: {
    allowedHosts: 'all',
  }
};