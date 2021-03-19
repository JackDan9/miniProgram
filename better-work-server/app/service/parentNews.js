'use strict';

const Service = require('egg').Service;


class ParentNewsService extends Service {
  async list({offset = 0, limit = 10}) {
    const { ctx } = this; // const ctx = this.ctx;

    const options = {
      attributes: ['id', 'order', 'title', 'summary', 'summary_html', 'source_type', 'source_name', 'publish_on'],
      order: [['publish_on', 'desc']],
      plain: false
    };

    return ctx.model.ParentNews.findAll(options);
  };
};

module.exports = ParentNewsService;
