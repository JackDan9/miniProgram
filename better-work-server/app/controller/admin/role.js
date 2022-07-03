'use strict';

const Controller = require("egg").Controller;

class RoleController extends Controller {
  // 获取角色列表
  async getRoleList () {
    const { ctx } = this;

    const pageData = ctx.request.body;
    const roleList = await ctx.service.admin.role.getRoleList(pageData);
    
    ctx.body = {
      code: 200,
      result: roleList,
      message: "获取角色列表成功"
    }
  }
  // 添加角色
  async addRole() {
    const { ctx } = this;
    const roleData = ctx.request.body;
    const resp = await ctx.service.admin.role.addRole(roleData);
    ctx.body = resp
  }

  // 分配角色权限
  async rolePermissions () {
    const { ctx } = this;
    const permissionsData = ctx.request.body;
    const resp = await ctx.service.admin.role.rolePermissions(permissionsData);
    ctx.body = resp;
  }
}

module.exports = RoleController;