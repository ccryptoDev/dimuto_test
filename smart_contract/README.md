# Test Smart Contract for DiMuto

## About
* It is a test smart contract to store & retrieve json encrpyted data on Polygon.

## Installation
```console
$ npm install
```

## Usage

### Build
```console
$ npx hardhat compile
```

### Test
```console
$ npx hardhat test
```
### Deploying contracts to Testnet (Public)
#### Testnet - Mumbai
* Environment variables
	- filling up a `secrets.json` file with its values (Refer to secrets.sample.json):
```
$ npx hardhat run scripts/deploy.js --network polygon_mumbai 
```


