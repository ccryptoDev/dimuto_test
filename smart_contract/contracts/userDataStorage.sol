// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract UserDataStorage {
  address public owner;
  struct UserData {
    string encryptedData;
    bytes32 dataHash; // Store the hash of the encrypted data
  }

  mapping(address => UserData) public users;

  event DataStored(address indexed user, string data, bytes32 dataHash);
  event DataRetrieved(address indexed user, string data, bytes32 dataHash, bool dataIntegrity);

  constructor() {
    owner = msg.sender;
  }

  modifier onlyOwner() {
    require(msg.sender == owner, "Only the owner can perform this action");
    _;
  }

  function storeData(string memory data) public {
    bytes32 dataHash = sha256(bytes(data)); // Calculate the hash
    users[msg.sender] = UserData(data, dataHash);
    emit DataStored(msg.sender, data, dataHash);
  }

  function retrieveData() public view returns (string memory, bool) {
    UserData memory user = users[msg.sender];
    bool dataIntegrity = sha256(bytes(user.encryptedData)) == user.dataHash;

    return (user.encryptedData, dataIntegrity);
  }

  function changeOwner(address newOwner) public onlyOwner {
    owner = newOwner;
  }
}
