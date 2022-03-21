'use strict';

const Controller = require('egg').Controller;

class RecuriteController extends Controller {
  async getRecuriteList() {
    const { ctx } = this; // const ctx = this.ctx;
    const _pageData = this.ctx.request.body;
    const _list = await this.ctx.service.recurite.getRecuriteList(_pageData)
    // 分页处理 page handle
    this.ctx.body = _list;

    // const query = {
    //   limit: ctx.helper.parseInt(ctx.query.pageSize),
    //   offset: (ctx.helper.parseInt(ctx.query.pageIndex) * ctx.helper.parseInt(ctx.query.pageSize) - ctx.helper.parseInt(ctx.query.pageSize)),
    // };

    // const parentRecuriteList = await ctx.service.parentRecurites.list(query);
    // const childRecuriteList = await ctx.service.childRecuriteList.list();

    // 响应数据 response data
    // let _retData = [];
    // parentRecuriteList.map((parentRecuriteItem) => {
    //   let _childRecuritesData = [];
    //   if (parentRecuriteItem['id'] === )
    // });
  };

  async getRecuriteDetail() {
    const { ctx } = this;

    const _id = this.ctx.request.body.id;
    const _res = await this.ctx.service.recurite.getRecuriteDetail(_id);

    this.ctx.body = _res;
  };

  async addRecurite() {
    const { ctx } = this;
    
    /** 增加信息返回结果: 1. 成功状态; 2. 失败状态 */
    let _res = {};

    const _recuriteParams = ctx.request.body;

    _recuriteParams.author = ctx.session.user.id;

    const _recuriteResult = await ctx.service.recurite.saveOrUpdateRecurite(_recuriteParams);
    
    if(_recuriteResult) {
      _res = {
        status: 200,
        message: "招聘信息发布成功",
      }
    } else {
      _res = {
        status: 9999,
        message: "招聘信息发布失败",
      }
    }
    ctx.body = _res;
  };
}

module.exports = RecuriteController;