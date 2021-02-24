"use strict"; 

let CryptoJS = require("../libs/ase");
let CONFIG = require("../config/config");
function Encrypt(word, key, iv) {
  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  //return encrypted.ciphertext.toString();
  return encrypted.toString();
}

function Decrypt(word, key, iv) {
  let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}

function post(cb, requestMethod = "post") {
  // check reqData
  let key = CryptoJS.enc.Utf8.parse(CONFIG.key);
  let iv = CryptoJS.enc.Utf8.parse(CONFIG.iv);

  let host = CONFIG.host + this.paramData.cmd;
  let requestData = this.paramData.param;
  let sign = Encrypt(JSON.stringify(requestData), key, iv);
  sign = encodeURIComponent(sign);
  let sendData = `key=${sign}`;
  let self = this;
  // console.log(`${host}?${sendData}`);
  wx.getNetworkType({
    success: function (res) {
      // 返回网络类型, 有效值：
      // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
      let networkType = res.networkType
      if (networkType != "none") {
        //检查是否需要加载动画
        self.loadingState = true;
        if (self.loadingState) {
          wx.showToast({
            title: 'loading...',
            image: '/imgs/loading.gif',
            duration: 1000 * 30,
            mask: true
          })
        }
        
        wx.request({
          url: host,
          data: requestData,
          method: requestMethod, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'source': "2", //来源 1留学 2 gpa
          }, // 设置请求的 header
          success: function (res) {
            // success
            wx.hideToast();
          },
          fail: function (ex) {
            // fail
            console.log(ex);
          },
          complete: function (response) {
            let resData = {
              status: 0,
              data: {},
              message: ""
            }
            if (response.errMsg != "request:ok") {
              resData.status = 1;
              resData.data = {};
              resData.message = "系统错误,请稍后重试！";
            } else if (response.statusCode == 200) {
              resData = response.data;
            }
            typeof cb == "function" && cb(resData)
            if (resData.status == 1) {
              wx.showModal({
                title: '错误提示',
                content: resData.message,
                showCancel: false,
                success: function (res) {
                  
                }
              });
            }
          }
        });
      } else {
        wx.showModal({
          title: '温馨提示',
          content: "请检查您的手机网络是否打开！",
          showCancel: false,
          success: function (res) {
          
          }
        });
      }
    }
  })
}
module.exports = {
  paramData: {
    "param": {},
    "cmd": "",
    "loadingState": true
  },
  post: post
}