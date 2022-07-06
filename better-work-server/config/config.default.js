/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1612516262795_6562';

  // add your middleware config here
  config.middleware = [];

  config.cluster = {
    listen: {
      port: 7001,
      hostname: '0.0.0.0',
    }
  };

  // add your database config here
  config.sequelize = {
    dialect: 'mysql',
    host: '106.15.47.133',
    port: 3306,
    username: 'root',
    password: 'Djj@Wff1314',
    database: 'better_work_data'
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: ["http://localhost:8888"]
  }

  config.cors = {
    origin: '*',
    allowMethods: 'GET, POST, DELETE, PUT'
  }

  config.jwt = {
    secret: "_1612516262795_6562",
    enable: false
  }

  config.wehcat = {
    token: 'weixin', // 基础配置的token信息
    appid: 'wx8a709a03e1584e6b', // 微信公众号的appid信息
    encodingAESKey: 'H6xJLje9n5JjgAFiCsmk0TfIkcUpiGrURAUxtnRui0G', // 微信公众号的encodingAESKey信息
  }

  return {
    ...config,
    ...userConfig,
  };
};
