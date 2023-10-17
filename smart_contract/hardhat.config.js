require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("hardhat-gas-reporter");
require("@nomiclabs/hardhat-etherscan");
const { PRIVATE_KEY, POLYGONSCAN_API_KEY } = require("./secrets.json");

module.exports = {
  solidity: {
    version: "0.8.10",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    polygon_mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [`0x${PRIVATE_KEY}`]
    },
    sepolia: {
		  url: 'https://eth-sepolia.g.alchemy.com/v2/v5h_FiMJrtauW0bi5PNrGLlIMxG4WISv',
      gas: 300000,
		  accounts: [`0x${PRIVATE_KEY}`]
	  }
  },
  etherscan: {
    apiKey: POLYGONSCAN_API_KEY
  }
};
