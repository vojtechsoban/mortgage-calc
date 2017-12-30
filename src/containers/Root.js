if (process.env.NODE_ENV === 'production') {
  module.exports = require('src/containers/Root.prod');
} else {
  module.exports = require('src/containers/Root.dev');
}
