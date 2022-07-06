'use strict';

const Controller = require('egg').Controller;

class RecuriteController extends Controller {
  async getRecuriteList() {
    const { ctx } = this; // const ctx = this.ctx;
    const pageData = this.ctx.request.body;
    const recuriteList = await this.ctx.service.recurite.getRecuriteList(pageData)
    // 分页处理 page handle
    this.ctx.body = {
      code: 200,
      result: recuriteList,
      message: "获取招聘列表成功"
    };

    // 之前非正确的写法
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

  async getRecuriteDetailsList() {
    const { ctx } = this;
    const pageData = ctx.request.body;
    const recuriteDetailsList = await ctx.service.recurite.getRecuriteDetailsList(pageData);
    ctx.body = {
      code: 200,
      result: recuriteDetailsList,
      message: "获取招聘详情列表成功"
    }
  };

  async getRecuriteDetail() {
    const { ctx } = this;

    const id = this.ctx.request.body.id;
    const resp = await this.ctx.service.recurite.getRecuriteDetail(id);

    this.ctx.body = {
      code: 200,
      result: resp,
      message: "获取招聘详情成功"
    };
  };

  async saveOrUpdateRecurite() {
    const { ctx } = this;
    
    /** 增加信息返回结果: 1. 成功状态; 2. 失败状态 */
    let res = {};

    const recuriteParams = ctx.request.body;

    // recuriteParams.author = ctx.session.user.id; // 缓存一下操作用户的信息-redis

    const recuriteResult = await ctx.service.recurite.saveOrUpdateRecurite(recuriteParams);
    console.log("recuriteResult: ", recuriteResult)
    if(recuriteResult) {
      res = {
        code: 200,
        result: true,
        message: "招聘信息发布成功",
      }
    } else {
      res = {
        code: 10000,
        result: false,
        message: "招聘信息发布失败",
      }
    }
    ctx.body = res;
  };

  async editRecurite() {
    const { ctx } = this;
    
    const editRecuriteParams = ctx.request.body;
    const editRecuriteResult = await ctx.service.recurite.editRecurite(editRecuriteParams);

    ctx.body = editRecuriteResult;
  };

  async editRecuriteDetails() {
    const { ctx } = this;

    const editRecuriteParams = ctx.request.body;
    const editRecuriteResult = await ctx.service.recurite.editRecuriteDetails(editRecuriteParams);

    ctx.body = editRecuriteResult;
  };

  async deleteRecurite() {
    const { ctx } = this;
    const deleteRecuriteParams = ctx.request.body;
    const delResp = await ctx.service.recurite.deleteRecurite(deleteRecuriteParams);

    ctx.body = delResp;
  };

  async addRecuriteDetail() {
    const { ctx } = this;

    /** 增加信息返回结果: 1. 成功状态; 2. 失败状态 */
    let res = {};

    const recuriteDetailParams = ctx.request.body;

    recuriteDetailParams.author = ctx.session.user.id;


  }
}

module.exports = RecuriteController;