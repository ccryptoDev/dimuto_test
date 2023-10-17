const { ethers, upgrades } = require("hardhat");

async function main() {
  const contractInstance = await ethers.getContractFactory("UserDataStorage");
  const userDataContract = await contractInstance.deploy();
  console.log("UserData Smart Contract is deployed to:", userDataContract.address);
}

main();
