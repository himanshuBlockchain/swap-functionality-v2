const crypto = require("crypto");
const { publicKeyCreate, privateKeyVerify } = require("secp256k1");
const keccak256 = require("keccak256");
const bip39 = require("bip39");

function sha256(words) {
  return crypto.createHash("sha256").update(words, "hex").digest("hex");
}

// TODO:
function generateMnemonic() {
  const mnemonic = bip39.generateMnemonic();
  //   console.log("[+] Mnemonic: ", mnemonic);

  const demoMnemonic = "enact peasant ski fever caution record excite quiz guide dream stool random";

  const seed = bip39.mnemonicToSeedSync(demoMnemonic);
  console.log("[+] Seed:", seed.toString("hex"));

  const hash = sha256(seed);
  console.log("[+] SHA256 hash:", hash);

  return hash;
}

generateMnemonic();

function generateEthAddress(privateKey) {
  /**
   * A private key is 256 bits i.e,
   * 64 hex string is 32 bytes in length as 1 byte is 2 char string in hex <br>
   *
   * 1 byte = 00000000 - 11111111 = 0x00 - 0xFF : 2 char string
   */
  // const privateKeyBuf = crypto.randomBytes(32);
  const privateKeyBuf = Buffer.from(privateKey, "hex");

  const privateKeyStr = privateKeyBuf.toString("hex");
  // console.log(privateKeyStr);
  console.log("[+] Verified private key: ", privateKeyVerify(privateKeyBuf));

  /* 
    Secp256k1 is the name of the elliptic curve used by Bitcoin to implement its public key cryptography. All points on this curve are valid Bitcoin public keys.

    this module is written in C and the node uses that module using libuv, it is an implementation of ECDSA(Elliptic_Curve_Digital_Signature_Algorithm) which uses Elliptic Curve Cryptosystem.

    https://github.com/bitcoin-core/secp256k1

    https://en.bitcoin.it/wiki/Elliptic_Curve_Digital_Signature_Algorithm

    https://en.bitcoin.it/wiki/Secp256k1

    https://www.npmjs.com/package/elliptic-curve: they import secp256k1 module

    https://www.npmjs.com/package/secp256k1

    https://www.npmjs.com/package/keccak256
*/
  const publicKey = Buffer.from(publicKeyCreate(privateKeyBuf, false)).toString("hex").slice(2); // remove first '04'
  console.log("[+] Public Key:", publicKey);

  const publicKeyBuf = Buffer.from(publicKey, "hex");

  // ------------------------------ Generating Address

  const ethAddressBuf = keccak256(publicKeyBuf);

  const ethAddressStr = ethAddressBuf.toString("hex").slice(64 - 40); // take last 20 bytes i.e, last 40 chars
  console.log(`[+] Ethereum Address: 0x${ethAddressStr.toUpperCase()}`);
}

// generateEthAddress("6020d7009efef3ac9106d2853f8c3fe1904ea12c61462d4e744e2f87e0a32013");
// generateEthAddress(generateMnemonic());
// 0x6E87465CcE87D66f85295ed493E62Bc15C963b47
