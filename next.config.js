// const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');

// module.exports = withCSS(withSass());

const isProd = process.env.NODE_ENV === 'production';
const assetPrefix = isProd ? 'https://metabridge.org/dev' : 'localhost:3000/dev';

module.exports = withSass({
  sassLoaderOptions: {
    includePaths: ['node_modules', 'styles']
  },
  assetPrefix,
  webpack: config => {
    /* eslint-disable-next-line no-param-reassign */
    config.output.publicPath = `${assetPrefix}${config.output.publicPath}`;
    return config;
  }
});
