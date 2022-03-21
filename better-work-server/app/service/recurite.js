/**
 * Descript: 招聘信息service模块
 * Date: 2022-02-22
 * Creator: JackDan
 */
'use strict';

const Service = require('egg').Service;

class RecuriteService extends Service {
  // 招聘列表
  async getRecuriteList(pageData) {
    const { ctx } = this;

    let _res = [];
    const { currentPage = 1, pageSize = 10, sort } = pageData;

    await this.ctx.model.Recurite.findAndCountAll({
      limit: pageSize,
      offset: pageSize * (currentPage - 1),
    }).then(res => {
      _res = res;
    }).catch(err => {
      console.log(err);
    });

    return _res;
  };

  // 招聘详情
  async getRecuriteDetail(recuriteId) {
    const { ctx } = this;

    let _res = {};

    await this.ctx.model.RecuriteDetail.findOne({where: { parent_id: recuriteId }})
    .then(res => {
      _res = res;
    }).catch(err => {
      console.log(err);
    });

    return _res;
  }

  // 删除招聘
  async deleteRecurite(recuriteId) {
    const { ctx } = this;

    let _res = {};

    await this.ctx.model.Recurite.destroy({
      where: {
        id: recuriteId
      }
    })
  }
}

module.exports = RecuriteService;