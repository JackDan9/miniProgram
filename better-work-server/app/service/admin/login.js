'use strict';

const Service = require('egg').Service;

class LoginService extends Service {
  // 登录查询账号
  async findUsername (username) {
    const { ctx } = this;
    const user = await ctx.model.SystemUsers.findOne({
      where: {
        username,
      },
    });
    
    return user;
  }
  // 登录查询个人信息
  async getUserInfo (info) {
    const { ctx } = this;
    
    let userInfo = {};
    
    console.log("info:", info);
    await ctx.model.SystemUsers.findOne({
      where: { uid: info.message.uid },
    }).then(async res => {
      if (res) {
        const roleInfo = await ctx.model.SystemRoles.findOne({where: {rid: res.role_id}});
        res.setDataValue("roleName", roleInfo.name);
        await ctx.model.SystemRolePermission.findOne({
          where: { role_id: res.role_id },
        }).then(async preRes => {
          if (preRes) {
            res.setDataValue("authorityRouter", preRes.permission_page);
            res.setDataValue("permissionButton", preRes.permission_button);
          }
        });
      }
      userInfo = res;
    });

    return userInfo;
  }
  // 查询用户信息
  async getUserInfoId (uid) {
    const { ctx } = this;
    return await ctx.model.SystemUsers.findById(uid);
  }
  // 生成 token 保存数据库
  async saveToken (data) {
    const { ctx } = this;
    await ctx.model.SystemToken.upsert(data);
  }
}

module.exports = LoginService;