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
    host: '192.168.1.224',
    port: 3306,
    username: 'root',
    password: 'passw0rd',
    database: 'better_work_data'
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
