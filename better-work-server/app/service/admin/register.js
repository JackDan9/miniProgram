'user strict';

const Service = require('egg').Service;
const { cryptoMd5 } = require('../../extend/helper');


class RegisterService extends Service {
  async userRegister(regData) {
    const { ctx } = this;
    const { username, password } = regData;
    const keys = this.config.keys;
    let results = "";
    await ctx.model.SystemUsers.findOne({
      where: {
        username,
      },
    }).then(async result => {
      if(!result) {
        regData.password = await cryptoMd5(password, keys);
        await ctx.model.SystemUsers.create(regData).then(res => {
          results = {
            code: 200,
            message: "注册成功",
          }
        }).catch(err => {
          results = {
            code: 10000,
            message: err,
          }
        })
      } else {
        results = {
          code: 10000,
          message: "该账号已存在",
        }
      }
    })

    return results;
  }
};

module.exports = RegisterService;