const HDWallet = require("ethereum-hdwallet");
var Bitcore = require("bitcore-lib");
var Mnemonic = require("bitcore-mnemonic");

const mnemonic =
  "split logic consider degree smile field term style opera dad believe indoor item type beyond";

function generateEthAddress(mnemonic) {
  const hdwallet = HDWallet.fromMnemonic(mnemonic);
  const address = hdwallet.derive(`m/44'/60'/0'/0/0`).getAddress();
  const addressHex = "0x" + address.toString("hex");
  return addressHex;
}

// Segwit only
function generateBtcAddress(mnemonic) {
  var code = new Mnemonic(mnemonic);
  var xPrivKey = code.toHDPrivateKey();
  var xPubKey, pubKey, address;
  xPubKey = Bitcore.HDPublicKey(xPrivKey.derive("m/49'/0'/0'"));
  pubKey = xPubKey.derive("m/0/0").publicKey;
  var script = new Bitcore.Script();
  script.add(Bitcore.Opcode.OP_0);
  script.add(pubKey.toAddress().hashBuffer);
  address = Bitcore.Address.payingTo(script);
  return address.toString();
}

function main() {
  console.log("btc address:", generateBtcAddress(mnemonic));
  console.log("eth address:", generateEthAddress(mnemonic));
}

main();
