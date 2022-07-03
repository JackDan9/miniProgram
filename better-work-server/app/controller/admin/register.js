'use strict';

const Controller = require('egg').Controller;

class RegisterController extends Controller {
  async userRegister() {
    const { ctx } = this;

    let regData = ctx.request.body;
    if(!regData.name) {
      // 如果真实名字为空，默认使用用户名
      regData.name = regData.username
    }

    let results = await ctx.service.admin.register.userRegister(regData);

    ctx.body = results;
  }
}

module.exports = RegisterController;