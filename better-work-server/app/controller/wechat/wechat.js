'use strict';

const wechat = require('co-wechat');
const crypto = require('crypto');

const Controller = require('egg').Controller;

class WechatController extends Controller {
  async index() {
    const { ctx } = this;
    
    const query = ctx.request.query;
    const signature = query.signature;
    const timestamp = query.timestamp;
    const nonce = query.nonce;
    const echostr = query.echostr;
    if (await this.check(timestamp, nonce, signature, 'weixin')) {
      this.ctx.body = echostr;
    } else {
      this.ctx.body = 'It is not from weixin';
    }
  }

  async check(timestamp, nonce, signature, token) {
    const tmp = [token, timestamp, nonce].sort().join('');
    const currSign = crypto.createHash('sha1').update(tmp).digest('hex');
    return (currSign === signature);
  }
}  

WechatController.prototype.wechat = wechat({
  token: 'weixin', // 基础配置的token信息
  appid: 'wx8a709a03e1584e6b', // 微信公众号的appid信息
  encodingAESKey: 'H6xJLje9n5JjgAFiCsmk0TfIkcUpiGrURAUxtnRui0G', // 微信公众号的encodingAESKey信息
}).middleware(async (message, ctx) => {
  console.log(message);
  return { type: 'text', content: 'Hello world!' };
})

module.exports = WechatController;