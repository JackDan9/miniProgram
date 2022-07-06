'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  // 用户列表获取
  async getUserList (pageData) {
    const { ctx } = this;
    
    let resp = [];
    const { pageNumber = 1, pageSize = 10, sort } = pageData;

    await ctx.model.SystemUsers.findAndCountAll({
      limit: parseInt(pageSize),
      offset: parseInt(pageSize) * (parseInt(pageNumber) - 1),
    }).then(res => {
      resp = res;
    }).catch(err => {
      console.log("get user list error: ", err);
    });
    return resp;
  };

  // 
}

module.exports = UserService;