'use strict';

const Controller = require('egg').Controller;

class NewsController extends Controller {
  /**
   * 获取新闻列表
   */
  async getNewsList() {
    const { ctx } = this;
    const pageData = ctx.request.body;
    const newsList = await ctx.service.news.getNewsList(pageData);
    
    ctx.body = {
      code: 200,
      result: newsList,
      message: "获取新闻列表成功"
    };
  };
  /**
   * 获取新闻详情列表
   */
  async getNewsDetailsList() {
    const { ctx } = this;
    const pageData = ctx.request.body;
    const newsDetailList = await ctx.service.news.getNewsDetailsList(pageData);
    ctx.body = {
      code: 200,
      result: newsDetailList,
      message: "获取新闻详情列表成功"
    }
  };
  /**
   * 获取新闻详情
   */
  async getNewsDetail() {
    const { ctx } = this;
    const id = ctx.request.body.id;
    
    const resp = await ctx.service.news.getNewsDetail(id);

    ctx.body = {
      code: 200,
      result: resp,
      message: "获取新闻详情成功"
    };
  };


  // 获取新闻-之前的非常复杂写法-特此纪念-千万不要借鉴
  // async getNews() {
  //   const { ctx } = this; // const ctx = this.ctx;

  //   const query = {
  //     limit: ctx.helper.parseInt(ctx.query.pageSize),
  //     offset: (ctx.helper.parseInt(ctx.query.pageIndex) * ctx.helper.parseInt(ctx.query.pageSize) - ctx.helper.parseInt(ctx.query.pageSize))
  //   };
    
  //   const parentNewsList = await ctx.service.parentNews.list(query);
  //   const childNewsList = await ctx.service.childNews.list();

  //   // result data
  //   // 优化到一层for循环
  //   let _retData = [];
  //   parentNewsList.map((parentNewsItem) => {
  //     let _childNewsData = [];
  //     childNewsList.map((childNewsItem) => {
  //       if (parentNewsItem['id'] ===  childNewsItem['parent_id']) {
  //         _childNewsData.push({
  //           'id': childNewsItem['id'],
  //           'parent_id': childNewsItem['parent_id'],
  //           'language': childNewsItem['language'],
  //           'author_name': childNewsItem['author_name'],
  //           'site_name': childNewsItem['site_name'],
  //           'title': childNewsItem['title'],
  //           'summary': childNewsItem['summary'],
  //           'summary_html': childNewsItem['summary_html'],
  //           'url': childNewsItem['url'],
  //           'mobile_url': childNewsItem['mobile_url'],
  //           'is_attachment': childNewsItem['is_attachment'],
  //           'attachment_name': childNewsItem['attachment_name'],
  //           'attachment_url': childNewsItem['attachment_url'],
  //           'publish_on': childNewsItem['publish_on']
  //         })
  //       }
  //     });
  //     _retData.push({
  //       'id': parentNewsItem['id'],
  //       'order': parentNewsItem['order'],
  //       'title': parentNewsItem['title'],
  //       'summary': parentNewsItem['summary'],
  //       'summary_html': parentNewsItem['summary_html'],
  //       'source_type': parentNewsItem['source_type'],
  //       'source_name': parentNewsItem['source_name'],
  //       'publish_on': parentNewsItem['publish_on'],
  //       'newsArray': _childNewsData
  //     });
  //   });

  //   ctx.body = {
  //     status: 0,
  //     message: "查询成功",
  //     data: _retData,
  //     pageSize: ctx.helper.parseInt(ctx.query.pageSize),
  //     totalItems: 67609,
  //     totalPages: 6761
  //   }
  // }

  async destroy() {
    const ctx = this.ctx;
    ctx.status = 200;
  }

  // 删除新闻
  async delNews() {

  }
};

module.exports = NewsController;