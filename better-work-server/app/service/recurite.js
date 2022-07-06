/**
 * Descript: 招聘信息service模块
 * Date: 2022-02-22
 * Creator: JackDan
 */
'use strict';

const { parseInt } = require('../extend/helper');

const Service = require('egg').Service;

class RecuriteService extends Service {
  // 招聘列表
  async getRecuriteList(pageData) {
    const { ctx } = this;

    let resp = [];
    const { pageNumber = 1, pageSize = 10, sort } = pageData;

    await ctx.model.Recurite.findAndCountAll({
      limit: parseInt(pageSize),
      offset: parseInt(pageSize) * (parseInt(pageNumber) - 1),
    }).then(res => {
      resp = res;
    }).catch(err => {
      console.log("get recurite list error: ", err);
    });

    return resp;
  };

  // 招聘详情列表
  async getRecuriteDetailsList(pageData) {
    const { ctx } = this;

    let resp = [];
    const { pageNumber = 1, pageSize = 10, sort } = pageData;

    await ctx.model.RecuriteDetail.findAndCountAll({
      limit: parseInt(pageSize),
      offset: parseInt(pageSize) * (parseInt(pageNumber) - 1),
    }).then(res => {
      resp = res;
    }).catch(err => {
      console.log("get recurite detail list error: ", err);
    });

    return resp;
  };

  // 招聘详情
  async getRecuriteDetail(recuriteId) {
    const { ctx } = this;

    let resp = {};

    await ctx.model.RecuriteDetail.findOne({where: { parent_id: recuriteId }})
    .then(res => {
      resp = res;
    }).catch(err => {
      console.log("get recurite detail by " + recuriteId + " error: ", err);
    });

    return resp;
  }

  // 新增或者修改文章
  async saveOrUpdateRecurite(data) {
    const { ctx } = this;
    let resp = "";
    await ctx.model.Recurite.upsert(data).then(res => {
      console.log("save or update recurite result: ", res);
      resp = true;
    }).catch(err => {
      console.log("save or update recurite error result: ", err);
      resp = false;
    });
    
    return resp;
  }

  // 新增或者修改招聘信息详情

  async saveOrUpdateRecuriteDetail(data) {
    const { ctx } = this;
    let res = "";
    
    await ctx.model.RecuriteDetail.upsert(data).then(res => {
      console.log("save or update recurite detail result: ", res);
      res = true;
    }).catch(err => {
      console.log("save or update recurite detail error result: ", err);
      res = false;
    });

    return res;
  }

  async editRecurite(data) {
    const { ctx } = this;

    const { id } = data;
    let resp = {};

    await ctx.model.Recurite.update(data, {
      where: { 
        id: id 
      }
    }).then((res) => {
      console.log("edit recurite result: ", res);
      resp = {
        code: 200,
        result: true,
        message: "招聘信息更新成功"
      };
    }).catch((err) => {
      console.log("edit recurite failed because: ", err);
      resp = {
        code: 10000,
        result: false,
        message: err
      };
    });

    return resp;
  }

  async editRecuriteDetails(data) {
    const { ctx } = this;

    const { id } = data;
    let resp = {};

    await ctx.model.RecuriteDetail.update(data, {
      where: {
        id: id
      }
    }).then((res) => {
      console.log("edit recurite detail result: ", res);
      resp = {
        code: 200,
        result: true,
        message: "招聘信息详情更新成功"
      };
    }).catch((err) => {
      console.log("edit recurite detail failed because: ", err);
      resp = {
        code: 10000,
        result: false,
        message: err
      };
    });

    return resp;
  }

  // 删除招聘
  async deleteRecurite(params) {
    const { ctx } = this;
    const { id } = params;

    let resp = {};

    await ctx.model.Recurite.destroy({
      where: {
        id: id
      },
    }).then(res => {
      console.log("delete recurite result: ", res);
      if(res > 0) {
        resp = {
          code: 200,
          result: true,
          message: "删除成功",
        };
      } else {
        resp = {
          code: 10000,
          result: false,
          message: "删除失败",
        };
      }
    }).catch(err => {
      console.log("delete recurite error result: ", err);
      resp = {
        code: 10000,
        result: false,
        message: err
      };
    });

    return resp;
  }
}

module.exports = RecuriteService;