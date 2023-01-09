"use strict";

const fs = require('fs');
const Controller = require("egg").Controller;


class AccessToken extends Controller {
  async index(config) {
    const { ctx } = this;


    let currentTime = new Date().getTime();

    //微信公众号获取Token地址
    // 参考链接: https://developers.weixin.qq.com/doc/offiaccount/Basic_Information/Get_access_token.html
    let url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + config.appId + '&secret=' + config.appScrect;

    // 首次获取access_token
    // access_token有效期为两个小时，如果过期重新请求[定时刷新]
    if (config.setAccessToken.accessToken  === '' || config.setAccessToken.time < currentTime) {
      await ctx.curl(url, {
        method: 'get',
      }).then((res) => {
        console.log("accessToken res data: ", res);

        let result = JSON.parse(res.data.toString());
        
        // 修改config配置
        config.setAccessToken.accessToken = result.access_token;
        config.setAccessToken.time = new Date().getTime() + (parseInt(result.expires_in) - 200) * 1000;

        // 将更新后的config写入文件
        fs.writeFileSync;
        fs.writeFile('./config.json', JSON.stringify(config), (error) => {
          
        })
      });
    } else {
      // 
    }
  }
}

module.exports = AccessToken;

// module.exports = (config) => {
//   return new Promise((resolve, reject)) {
//     let currentTime = new Date().getTime();

//     //微信公众号获取Token地址
//     // 参考链接: https://developers.weixin.qq.com/doc/offiaccount/Basic_Information/Get_access_token.html
//     let url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + config.appId + '&secret=' + config.appScrect;

//     // 有效期为两个小时，如果过期重新请求[定时刷新]
//   }
// } 