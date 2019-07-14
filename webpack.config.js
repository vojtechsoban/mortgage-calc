
const path = require('path')
const fs = require('fs')
const rules = require('./webpack/rules')
const plugins = require('./webpack/plugins')
const optimization = require('./webpack/optimization')
const webpackLog = require('webpack-log')
const { buildVersion } = require('./scripts/build-version-json')

let configPrint = false

module.exports = (env) => {

  const nodeEnv = process.env.NODE_ENV || 'development'
  const isProdBuild = nodeEnv === 'production'

  const analyzer = !!env && !!env.analyzer

  const ROOT_DIR = path.resolve(__dirname)
  const DIST_DIR = path.resolve(__dirname, 'dist')
  const NODE_MODULES_DIR = path.resolve(__dirname, 'node_modules')

  // It pollutes ESLint since it uses eslint-import-resolver-webpack to properly resolve imports from src root
  if (!configPrint) {
    configPrint = true
    webpackLog({ name: 'Build Environment' }).info(nodeEnv)
    webpackLog({ name: 'Git Commit' }).info(buildVersion().commitHash)
  }

  const polyfills = ['@babel/polyfill', 'whatwg-fetch']

  const entry = isProdBuild
    ? [...polyfills, './src/index.jsx']
    : ['react-hot-loader/patch', ...polyfills, './src/index.jsx']
  const output = {
    path: DIST_DIR,
    filename: isProdBuild && !analyzer ? `mortgage-calc-[contenthash].js` : '[name]-[hash].js',
    publicPath: '/',
    pathinfo: false,
  }

  const resolve = {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    modules: [
      ROOT_DIR,
      NODE_MODULES_DIR,
    ],
  }

  // Webpack has some issues with building production source maps, so source-map is one of
  // suggested options for production from https://webpack.js.org/configuration/devtool
  const devtool = isProdBuild ? 'source-map' : 'cheap-module-eval-source-map'

  return {
    entry,
    output,
    resolve,
    devtool,
    stats: 'errors-only',
    optimization,
    module: { rules: rules() },
    plugins: plugins(env),
    devServer: !isProdBuild
      ? {
        stats: 'errors-only',
        before(app) {
          app.get('/version.json', (req, res) => {
            res.json(buildVersion())
          })
          app.get('/environment.cfg', (req, res) => {
            const logContext = 'GET /environment.cfg:'
            const environmentCfgFileName = path.join(ROOT_DIR, 'artifacts/environment.cfg')
            const environmentLocalModuleName = 'src/common/environment-local'
            const environmentLocalFileName = path.join(ROOT_DIR, `${environmentLocalModuleName}.js`)
            // To test generated configuration locally, it has precedence over local config since it is more rare
            if (fs.existsSync(environmentCfgFileName)) {
              res.send(fs.readFileSync(environmentCfgFileName))
              console.info(`${logContext} sending generated artifacts/environment.cfg`)
            } else if (fs.existsSync(environmentLocalFileName)) {
              let localOverrides = null
              try {
                Object.keys(require.cache).forEach((id) => {
                  if (id.includes(environmentLocalModuleName)) {
                    delete require.cache[id]
                    console.log(`${logContext} Found module ${id} and deleted it from cache`)
                  }
                })
                // eslint-disable-next-line global-require,import/no-dynamic-require
                localOverrides = require(`./${environmentLocalModuleName}`).default
                console.log('Using local overrides: ', JSON.stringify(localOverrides, null, 2))
              } catch (e) {
                const errorMsg = `${environmentLocalFileName} contains errors, is it commonJS module? Webpack does not recognize ES6 import/export`
                res.status(500).send(errorMsg)
                console.error(errorMsg, e)
              }
              if (localOverrides) {
                res.send(Buffer.from(JSON.stringify(localOverrides)).toString('base64'))
                console.info(`${logContext} sending /environment.cfg generated from environment-local.js`)
              }
            } else {
              // otherwise send at least an empty object to avoid 404 when on local dev server
              res.send(Buffer.from(JSON.stringify({})).toString('base64'))
            }
          })
        },
      }
      : undefined,
  }
}
