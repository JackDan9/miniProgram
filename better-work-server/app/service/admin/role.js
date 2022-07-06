'use strict';

const Service = require("egg").Service;


class RoleService extends Service {
  async getRoleList(pageData) {
    const { ctx } = this;

    let resp = [];
    const { pageNumber = 1, pageSize = 10, sort } = pageData;

    await ctx.model.SystemRoles.findAndCountAll({
      limit: parseInt(pageSize),
      offset: parseInt(pageSize) * (parseInt(pageNumber) - 1)
    }).then(async res => {
      resp = res;
    }).catch(err => {
      console.log("get role list err: ", err);
    });
    return resp;
  };

  async addRole(options) {
    const { ctx } = this;
    const { rid = null, name, describe, status } = options;

    let results = {};

    if(rid) {
      await ctx.model.SystemRoles.findById(rid).then(async res => {
        if(res.name === "超级管理员") {
          results = {
            code: 10000,
            message: "系统最高权限不可以修改"
          }
        } else {
          await ctx.model.SystemRoles.update({
            name,
            describe,
            status,
          }, {
            where: {
              rid,
            },
          }).then(res => {
            if (res > 0) {
              results = {
                code: 200,
                message: "角色修改成功",
              }
            }
          }).catch(err => {
            results = {
              code: 10000,
              message: err,
            }
          })
        }
      })
    } else {
      await ctx.model.SystemRoles.findOne({
        where: {
          name,
        },
      }).then(async res => {
        if (!res) {
          await ctx.model.SystemRoles.create(options).then(async res => {
            await ctx.model.SystemRolePermission.create({
              role_id: res.rid,
            }).then(() => {
              results = {
                code: 200,
                message: "角色添加成功",
              }
            }).catch(err => {
              results = {
                code: 10000,
                message: err,
              }
            })
          }).catch(err => {
            results = {
              code: 10000,
              message: err,
            }
          })
        } else {
          results = {
            code: 10000,
            message: "该角色已存在",
          }
        }
      })
    }
    return results;
  }

  async rolePermissions (options) {
    const { ctx } = this;
    const { rid, selectPermission } = options;
    const permissionPage = [];
    const permissionButton = [];

    for (let i = 0; i < selectPermission.length; i++) {
      if (selectPermission[i].toString().includes("btn")) {
        permissionButton.push(selectPermission[i]);
      } else {
        permissionPage.push(selectPermission[i]);
      }
    }

    let results = {};
    
    await ctx.model.SystemRolePermission.update({
      permission_page: permissionPage.join(","),
      permission_button: permissionButton.join(","),
    }, {
      where: {
        role_id: rid,
      },
    }).then(async res => {
      console.log("role permission set: ", res);
      results = {
        code: 200,
        message: "该角色分配成功",
      };
    }).catch(err => {
      console.log("role permission set failed because: ", err);
      results = {
        code: 10000,
        message: err,
      };
    });

    return results;
  }
}

module.exports = RoleService;