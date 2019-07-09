const { buildVersion } = require('../../scripts/build-version-json')

const BUNDLE_FILENAME_REGEXP = /^bundle-.*\.js$/
const OUTPUT_FILENAME = 'version.json'

class VersionFile {
  // eslint-disable-next-line class-methods-use-this
  apply(compiler) {
    compiler.hooks.emit.tapAsync('VersionFile', (compilation, callback) => {

      // Loop through all compiled assets
      const bundle = Object.keys(compilation.assets).find(filename => BUNDLE_FILENAME_REGEXP.test(filename))

      const result = {
        ...buildVersion(),
        bundle,
      }

      const resultString = JSON.stringify(result, null, 2)

      // Insert result JSON into the Webpack build as a new file asset
      // eslint-disable-next-line no-param-reassign
      compilation.assets[OUTPUT_FILENAME] = {
        source: () => resultString,
        size: () => resultString.length,
      }

      callback()
    })
  }
}

module.exports = VersionFile
