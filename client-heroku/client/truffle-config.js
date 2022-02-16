require('babel-register');
require('babel-polyfill');
require('dotenv').config()

const HDWalletProvider = require('@truffle/hdwallet-provider')

module.exports = {
  networks: {
    ropsten: {
      provider: function() {
        return new HDWalletProvider(
          process.env.ROPSTEN_PRIVATE_KEY,
          `https://ropsten.infura.io/v3/fec5665e22e141d08f6c1a332c97ee42`
        )
      },
      gasPrice: 21,
      network_id: 3,
    },
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" //Match any network
    }
  },
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
