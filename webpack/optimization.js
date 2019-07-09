const TerserPlugin = require('terser-webpack-plugin')

const env = process.env.NODE_ENV || 'development'
const isProduction = env === 'production' || true

module.exports = isProduction ? {
  minimizer: [
    new TerserPlugin({
      parallel: true,
      sourceMap: true,
    }),
  ],
  splitChunks: {
    chunks: 'all',
    minSize: 30000,
    maxSize: 0,
    minChunks: 1,
    maxAsyncRequests: 6,
    maxInitialRequests: 6,
    automaticNameDelimiter: '~',
    name: true,
    cacheGroups: {
      // vendor chunk
      vendors: {
        chunks: 'all',
        test: /[\\/]node_modules[\\/]/,
        priority: -10,
        enforce: true,
      },
      // static files that are never changed - long term caching
      static: {
        // name of the chunk
        name: 'static',

        // Exclude locale chunks from bundling to this chunk
        chunks: (chunk) => !chunk.name.match('locale'),

        // all proto files, and static json, exclude locales files
        test: /[\\/]static[\\/]/,

        priority: 20,
        minChunks: 1,
        enforce: true,
        minSize: 0,
      },
    },
  },
} : {}
