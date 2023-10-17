import Web3 from "web3";
import { AES, enc } from 'crypto-js';
import UserDataContractABI from './abis/UserDataStorage.json';

const USER_DATA_CONTRACT = `${process.env.REACT_APP_USER_DATA_CONTRACT}`

// generate encryption key by user wallet address
export const generateEncryptionKey = async(walletAddress) => {
  const encoder = new TextEncoder();

  // Convert the wallet address to an ArrayBuffer
  const walletAddressBuffer = encoder.encode(walletAddress);

  // Use the SubtleCrypto API to derive the encryption key
  const derivedKeyBuffer = await crypto.subtle.digest('SHA-256', walletAddressBuffer);

  // Convert the derived key to a hexadecimal string
  const derivedKeyHex = Array.from(new Uint8Array(derivedKeyBuffer))
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('');

  return derivedKeyHex;
}

// Encryption
export const encryptData = (data, key) => {
  const encrypted = AES.encrypt(JSON.stringify(data), key);
  return encrypted.toString();
}

// Decryption
export const decryptData = (encryptedData, key) => {
  const decrypted = AES.decrypt(encryptedData, key);
  const decryptedText = decrypted.toString(enc.Utf8);
  return JSON.parse(decryptedText);
}

// Get user's wallet address
export const getUserAddress = async() => {
  try{
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    return accounts[0] || "";
  } catch(err) {
    console.error(err);
    return false;
  }
}

// Write encrypted data on polygon
export const writeUserData = async(userData, userAddress) => {
  const encrypted_key = localStorage.getItem('encryption_key');
  const encryptedData = encryptData(userData, encrypted_key);
  
  window.web3 = new Web3(window.ethereum);
  const contract = await new window.web3.eth.Contract(UserDataContractABI, USER_DATA_CONTRACT);

  try {
    return await contract.methods.storeData(encryptedData).send({
      from: userAddress
    });
  } catch (err) {
    console.log(err)
    return false;
  }
}

// Retrieve encrypted data from Polygon
export const retrieveUserData = async(userAddress) => {
  const encrypted_key = localStorage.getItem('encryption_key');

  window.web3 = new Web3(window.ethereum);
  const contract = await new window.web3.eth.Contract(UserDataContractABI, USER_DATA_CONTRACT);

  try {
    const res = await contract.methods.retrieveData().call({
      from: userAddress
    });
    if (res[1]) { // retrieved correctly
      const decryptedData = decryptData(res[0], encrypted_key);
      return decryptedData;
    } else { // non-correct encrypted data
      return false;
    }
  } catch(err) {
    console.log(err);
    return false;
  }
}

