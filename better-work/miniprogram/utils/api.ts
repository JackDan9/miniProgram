const CryptoJS = require('../libs/ase.js')
const CONFIG = require('../config')

const Encrypt = (word:any, key:any, iv:any) => {
  const srcs = CryptoJS.enc.Utf8.parse(word);
  const encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  
}