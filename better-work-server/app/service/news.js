/**
 * 
 */
'use strict';

const Service = require('egg').Service;

class NewsService extends Service {
  // 新闻列表
  async getNewsList(pageData) {
    const { ctx } = this;

    let resp = [];
    const { pageNumber = 1, pageSize = 10, sort } = pageData;

    await ctx.model.News.findAndCountAll({
      limit: parseInt(pageSize),
      offset: parseInt(pageSize) * (parseInt(pageNumber) - 1),
      order: [["publish_at", "DESC"]]
    }).then(res => {
      resp = res;
    }).catch(err => {
      console.log("get news list error: ", err);
    });

    return resp;
  }

  async getNewsDetailsList(pageData) {
    const { ctx } = this;

    let resp = [];

    const { pageNumber = 1, pageSize = 10, sort } = pageData;

    await ctx.model.NewsDetail.findAndCountAll({
      limit: parseInt(pageSize),
      offset: parseInt(pageSize) * (parseInt(pageNumber) - 1),
    }).then(res => {
      resp = res;
    }).catch(err => {
      console.log("get news details list error: ", err);
    });

    return resp;
  }

  // 新闻详情
  async getNewsDetail(id) {
    const { ctx } = this;

    let resp = {};

    await ctx.model.NewsDetail.findOne({
      where: {
        parent_id: id
      }
    }).then(res => {
      resp = res;
    }).catch(err => {
      console.log("get news detail by " + id + " errorL ", err);
    });

    return resp;
  };
}

module.exports = NewsService;