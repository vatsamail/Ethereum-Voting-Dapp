// Allows us to use ES6 in our migrations and tests.
require('babel-register')

module.exports = {
  networks: {
    development: { // should be replaced from default: ganache
      host: '127.0.0.1',
      port: 8545, // ganache-cli
      // port: 8080, // npm run dev
      network_id: '*' // Match any network id
    }
  }
}
