'use strict';

const Service = require("egg").Service;


class ChildNewsService extends Service {
  async list() {
    const { ctx } = this;

    const options = {
      attributes: ['id', 'parent_id', 'language', 'author_name', 'site_name', 'title', 'summary', 'summary_html', 'url', 'mobile_url', 'is_attachment', 'attachment_name', 'attachment_url', 'publish_on'],
      plain: false
    };

    return ctx.model.ChildNews.findAll(options);
  };
};

module.exports = ChildNewsService;