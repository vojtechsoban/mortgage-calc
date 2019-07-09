const webpack = require('webpack')
const webpackLog = require('webpack-log')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const VersionFilePlugin = require('./plugins/webpack-version-file-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { buildVersion } = require('../scripts/build-version-json')

module.exports = (env = {}) => {

  const analyzer = !!env.analyzer

  analyzer && webpackLog({ name: 'Webpack bundle analyzer' }).info('Enabled')

  const versionMetadata = buildVersion()
  const nodeEnv = process.env.NODE_ENV || 'development'
  const isProdBuild = nodeEnv === 'production'

  const copyPluginOptions = []

  const copyPlugin = copyPluginOptions.length > 0 ? [new CopyWebpackPlugin(copyPluginOptions)] : []

  const plugins = [

    ...copyPlugin,


    new webpack.DefinePlugin({
      'process.env': JSON.stringify({
        NODE_ENV: nodeEnv,
        // adding GIT_COMMIT, VERSION to process.env is simple hack to make it global
        GIT_COMMIT: versionMetadata.commitHash,
        VERSION: versionMetadata.version,
      }),
    }),


    new HtmlWebpackPlugin({
      template: 'src/index.html',
      version: versionMetadata.version,
      gitCommit: versionMetadata.commitHash,
      commitDate: versionMetadata.commitDate,
      buildDate: versionMetadata.buildDate,
    }),

    new VersionFilePlugin(),
  ]

  const devOnlyPlugins = !isProdBuild ? [
    new webpack.NamedModulesPlugin(),
  ] : []

  const productionOnlyPlugins = isProdBuild ? [
    new CompressionPlugin({
      compressionOptions: {
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.html$|\.css$/,
        threshold: 10240,
        minRatio: 0.8,
      },
    }),

    new MiniCssExtractPlugin({
      filename: `mortgage-calc-[contenthash].css`,
      chunkFilename: `[id].mortgage-calc-[contenthash].css`,
    }),

    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true,
    }),
  ] : []

  const analyzePlugin = analyzer ? [
    new BundleAnalyzerPlugin(),
  ] : []

  return [
    ...plugins,
    ...devOnlyPlugins,
    ...productionOnlyPlugins,
    ...analyzePlugin,
  ].filter(plugin => !!plugin)
}
