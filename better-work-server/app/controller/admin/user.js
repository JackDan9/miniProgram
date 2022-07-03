'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  // 用户列表获取
  async getUserList () {
    const { ctx } = this;
    
    const pageData = ctx.request.body;
    const userList = await ctx.service.admin.user.getUserList(pageData);

    ctx.body = {
      code: 200,
      result: userList,
      message: "获取用户列表成功"
    };
  };
}

module.exports = UserController;