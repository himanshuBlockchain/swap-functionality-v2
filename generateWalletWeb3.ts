import Web3 from "web3";
import { WalletBase } from "web3-core";

const web3 = new Web3();
const password = "PASSWORD123";

function createAccount() {
  const account = web3.eth.accounts.create();

  console.log(account);

  return account;
}

function encryptAccount(privateKey: string, password: string) {
  const encryptAccount = web3.eth.accounts.encrypt(privateKey, password);

  console.log(encryptAccount);

  return encryptAccount;
}

function decryptAccount(keyStore: any, password: string) {
  const decryptedAccount = web3.eth.accounts.decrypt(keyStore, password);

  console.log(decryptedAccount);

  return decryptedAccount;
}

function createWallet() {
  const wallet = web3.eth.accounts.wallet.create(1); // create wallet with default 1 account

  console.log(wallet[0]);

  return wallet;
}

function createEncryptedWallet() {
  const wallet = web3.eth.accounts.wallet.create(1);
  const walletEncrypted = web3.eth.accounts.wallet.encrypt(password); // create wallet with default 1 account

  console.log(wallet[0]);
  console.log(walletEncrypted);

  return walletEncrypted;
}

function decryptWallet(keyStore: any, password: string) {
  const decryptedWallet = web3.eth.accounts.wallet.decrypt(keyStore, password);

  console.log(decryptedWallet[0]);

  return decryptedWallet;
}

// //////////////////////////////////////////////////////////////////
let wallet: WalletBase;
function createWalletDemo() {
  wallet = web3.eth.accounts.wallet.create(1);

  return wallet;
}

function createAccountAndAddToWallet() {
  const account = web3.eth.accounts.create();

  wallet.add(account);

  return wallet;
}

// createAccount();
// encryptAccount(createAccount().privateKey, password);
// decryptAccount(encryptAccount(createAccount().privateKey, password), password);
// createWallet();
// createEncryptedWallet();
// decryptWallet(createEncryptedWallet(), password);

let createdWallet = createWalletDemo();
console.log(`[+] After wallet no of accounts in wallet: ${createdWallet.length}`);
traverseWallet();

console.log("\n[+] Creating Accounts");
createAccountAndAddToWallet();
createAccountAndAddToWallet();
createdWallet = createAccountAndAddToWallet();
console.log(`[+] After accounts added to wallet, no of accounts in wallet: ${createdWallet.length}`);
traverseWallet();

function traverseWallet() {
  console.log(`\n${"-".padEnd(50, "-")} Wallet Info ${"-".padEnd(50, "-")}`);
  console.log("\t\t\tprivateKey \t\t\t\t\t\t\t address");
  for (let i: number = 0; i < createdWallet.length; i++) {
    console.log(createdWallet[i].privateKey, "\t", createdWallet[i].address);
  }
  console.log();
}
