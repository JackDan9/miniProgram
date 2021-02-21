'use strict';

const Controller = require('egg').Controller;

class NewsController extends Controller {
  async index() {
    const { ctx } = this; // const ctx = this.ctx;

    const query = {
      limit: ctx.helper.parseInt(ctx.query.pageSize),
      offset: ctx.helper.parseInt(ctx.query.pageIndex)
    };
    
    const parentNewsList = await ctx.service.parentNews.list(query);
    const childNewsList = await ctx.service.childNews.list();

    // result data
    let _retData = [];
    parentNewsList.map((parentNewsItem) => {
      let _childNewsData = [];
      childNewsList.map((childNewsItem) => {
        if (parentNewsItem['id'] ===  childNewsItem['parent_id']) {
          _childNewsData.push({
            'parent_id': childNewsItem['parent_id'],
            'language': childNewsItem['language'],
            'author_name': childNewsItem['author_name'],
            'site_name': childNewsItem['site_name'],
            'title': childNewsItem['title'],
            'summary': childNewsItem['summary'],
            'url': childNewsItem['url'],
            'mobile_url': childNewsItem['mobile_url'],
            'is_attachment': childNewsItem['is_attachment'],
            'attachment_name': childNewsItem['attachment_name'],
            'attachment_url': childNewsItem['attachment_url'],
            'publish_on': childNewsItem['publish_on']
          })
        }
      });
      _retData.push({
        'id': parentNewsItem['id'],
        'order': parentNewsItem['order'],
        'title': parentNewsItem['title'],
        'summary': parentNewsItem['summary'],
        'source_type': parentNewsItem['source_type'],
        'source_name': parentNewsItem['source_name'],
        'publish_on': parentNewsItem['publish_on'],
        'newsArray': _childNewsData
      });
    });

    ctx.body = {
      status: 0,
      message: "查询成功",
      data: _retData,
      pageSize: 10,
      totalItems: 67609,
      totalPages: 6761
    }
  }

  async destroy() {
    const ctx = this.ctx;
    ctx.status = 200;
  }
};

module.exports = NewsController;