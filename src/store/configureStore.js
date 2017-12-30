if (process.env.NODE_ENV === 'production') {
  module.exports = require('src/store/configureStore.prod');
} else {
  module.exports = require('src/store/configureStore.dev');
}
