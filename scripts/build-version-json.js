Object.defineProperty(exports, '__esModule', {
  value: true,
})

const git = require('git-rev-sync')
const fs = require('fs')

const { version } = JSON.parse(fs.readFileSync('./package.json'))

exports.default = buildVersion
exports.buildVersion = buildVersion

/**
 * Generates version data to identify deployed version (dev/test purposes) and also to check
 * if there is newer version deployed on the production (downloaded bundle version don't match server version).
 * @return {{version: string, commitHash: string, commitDate: Date, buildDate: Date}}
 */
function buildVersion() {
  return ({
    version,
    commitHash: git.short(),
    commitDate: git.date(),
    buildDate: new Date(),
  })
}
