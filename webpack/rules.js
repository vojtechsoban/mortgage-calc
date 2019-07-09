const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const autoprefixer = require('autoprefixer')

const nodeEnv = process.env.NODE_ENV || 'development'
const isProduction = nodeEnv === 'production'

// DEV
// *************************************************************************** //

const devRules = () => (!isProduction ? [
  {
    test: /\.tsx?$/,
    use: {
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
        experimentalWatchApi: true,
      },
    },
    exclude: /node_modules/,
  },
  {
    test: /\.jsx?$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
  },
  {
    test: /\.css$/,
    use: [
      'style-loader',
      'css-loader',
    ],
  },
  {
    test: /\.scss$/,
    use: [
      'style-loader',
      'css-loader',
      'sass-loader',
    ],
  },
  {
    oneOf: [
      {
        test: /\.module\.less$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { modules: true, localsConvention: 'camelCase' } },
          {
            loader: 'less-loader',
          },
        ],
      },
      {
        test: /^((?!\.module).)*less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
          },
        ],
      },
    ],
  },
] : [])


// PROD
// *************************************************************************** //

const prodRules = () => (isProduction ? [
  {
    test: /\.tsx?$/,
    use: {
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
      },
    },
    exclude: /node_modules/,
  },
  {
    test: /\.jsx?$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
  },
  {
    test: /\.css$/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader',
      {
        loader: 'postcss-loader',
        options: { plugins: () => [autoprefixer] },
      },
    ],
  },
  {
    test: /\.scss$/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader',
      {
        loader: 'postcss-loader',
        options: { plugins: () => [autoprefixer] },
      },
      'sass-loader',
    ],
  },
  {
    oneOf: [
      {
        test: /\.module\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { modules: true, localsConvention: 'camelCase' } },
          {
            loader: 'postcss-loader',
            options: { plugins: () => [autoprefixer] },
          },
          {
            loader: 'less-loader',
          },
        ],
      },
      {
        test: /^((?!\.module).)*less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: { plugins: () => [autoprefixer] },
          },
          {
            loader: 'less-loader',
          },
        ],
      },
    ],
  },
] : [])

// COMMON
// *************************************************************************** //

const commonRules = [
  {
    test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
    },
  },
]

module.exports = () => [
  ...prodRules(),
  ...devRules(),
  ...commonRules,
]
