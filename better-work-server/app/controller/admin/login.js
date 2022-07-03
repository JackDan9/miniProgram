'use strict';

const { cryptoMd5 } = require('../../extend/helper');

const Controller = require('egg').Controller;

class LoginController extends Controller {
  // 用户登录接口
  async userLogin() {
    const { ctx } = this;

    const { username, password } = ctx.request.body;

    const keys = this.config.keys;

    let results = "";
    let roleStatus
    
    const user = await ctx.service.admin.login.findUsername(username);
    if (!user || user.status === "2") {
      results = {
        code: 10000,
        message: "用户名不存在",
      }
    } else {
      const newPass = await cryptoMd5(password, keys);
      await ctx.model.SystemRoles.findOne({where: {rid: user.role_id}}).then(async res => {
        roleStatus = res.status;
      })
      if (user.password !== newPass) {
        results = {
          code: 10000,
          message: "密码错误",
        }
      } else if (user.status === "0") {
        results = {
          code: 10000,
          message: "该账号已经被禁用，请联系管理员",
        }
      } else if (!roleStatus) {
        results = {
          code: 10000,
          message: "该账号所在角色已经被禁用，请联系管理员",
        }
      } else {
        const refresh_token = await ctx.helper.createToken({ uid: user.uid }, "7", "days");
        const access_token = await ctx.helper.createToken({ uid: user.uid }, "2", "hours");

        const uid = user.uid;
        await ctx.service.admin.login.saveToken({ uid, access_token, refresh_token });

        results = {
          code: 200,
          result: {
            token: access_token,
          },
          msg: "用户登录成功",
        }
      }
    }
    ctx.body = results;
  }
  // 登录成功之后查询个人信息
  async getUserInfo() {
    const { ctx } = this;
    
    const token = await ctx.helper.getAccessToken();
    const results = {}
    await ctx.app.jwt.verify(token, ctx.app.config.jwt.secret, function(err, decoded) {
      if (err) {
        results.verify = false;
        results.message = err.message;
      } else {
        results.verify = true;
        results.message = decoded;
      }
    })

    const userInfo = await ctx.service.admin.login.getUserInfo(results);
    ctx.session.user = userInfo;

    if(userInfo) {
      
      ctx.body = {
        code: 200,
        result: {
          name: userInfo.name,
          role: userInfo.getDataValue("roleName"),
          authorityRouter: userInfo.getDataValue("authorityRouter"),
          permissionButton: userInfo.getDataValue("permissionButton"),
          avatar: userInfo.avatar,
          uid: userInfo.uid
        }
      }
    } else {
      await ctx.helper.error(401, 10000, "该账号不存在")
    }
  }
  // 获取用户信息
  async getUserInfoId() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    
    ctx.body = await ctx.service.admin.login.getUserInfoId(id);
  }
}

module.exports = LoginController;