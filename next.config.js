// const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');

// module.exports = withCSS(withSass());

module.exports = withSass({
  sassLoaderOptions: {
    includePaths: ['node_modules', 'styles']
  }
});
