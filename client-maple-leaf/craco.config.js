/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  webpack: {
    resolve: {
      modules: ['src', 'node_modules'],
      extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
    },
  },
};
