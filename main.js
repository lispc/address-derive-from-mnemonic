const bip39 = require("bip39");
const bitcoin = require("bitcoinjs-lib");
const { bufferToHex, privateToAddress } = require("ethereumjs-util");
const HDKey = require("hdkey");

const mnemonic =
  "split logic consider degree smile field term style opera dad believe indoor item type beyond";

function generateEthAddress(mnemonic) {
  const hdpath = "m/44'/60'/0'/0/0";
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  const hdkey = HDKey.fromMasterSeed(seed).derive(hdpath);
  const address = bufferToHex(privateToAddress(hdkey.privateKey));
  return address;
}

function generateBtcAddress(mnemonic) {
  const hdpath = "m/49'/0'/0'/0/0";
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  const hdkey = HDKey.fromMasterSeed(seed).derive(hdpath);
  const { address } = bitcoin.payments.p2sh({
    redeem: bitcoin.payments.p2wpkh({ pubkey: hdkey.publicKey }),
  });
  return address;
}

function main() {
  // 3Mry7ysaNgZypqTN74S2M5prNCaBa7jNyS
  console.log("btc address:", generateBtcAddress(mnemonic));
  // 0x25ec658304dd1e2a4e25b34ad6ac5169746c4684
  console.log("eth address:", generateEthAddress(mnemonic));
}

main();
