import { ethers } from "ethers";
import { generateMnemonic } from "bip39";

// const mnemonic = "enact peasant ski fever caution record excite quiz guide dream stool random";
const mnemonic = generateMnemonic();
const password = "PASSWORD123";

function createWallet(mnemonic: string) {
  const wallet = ethers.Wallet.fromMnemonic(mnemonic);

  console.log("[+] private key:", wallet.privateKey);
  console.log("[+] public key:", wallet.publicKey);
  console.log("[+] account address:", wallet.address);
}

function randomWallet() {
  const wallet = ethers.Wallet.createRandom();

  console.log("[+] private key:", wallet.privateKey);
  console.log("[+] public key:", wallet.publicKey);
  console.log("[+] account address:", wallet.address);
}

async function encryptWallet(mnemonic: string) {
  const wallet = ethers.Wallet.fromMnemonic(mnemonic);

  let encryptWallet = await wallet.encrypt(password);

  return encryptWallet;
}

function createWalletFromJson(json: any, password: string) {
  const wallet = ethers.Wallet.fromEncryptedJsonSync(json, password);

  console.log("[+] private key:", wallet.privateKey);
  console.log("[+] public key:", wallet.publicKey);
  console.log("[+] account address:", wallet.address);
}

// createWallet(mnemonic);
// randomWallet();

(async () => {
  // let walletJson = await encryptWallet(mnemonic);
  // console.log(JSON.parse(walletJson));
  // //
  // const walletJson = await encryptWallet(mnemonic);
  // createWalletFromJson(walletJson, password);
})();
