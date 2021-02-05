'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.status = 200;
    ctx.body = {
      'version': '1.0.0'
    };
  }
}

module.exports = HomeController;
