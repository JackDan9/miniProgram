'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  static: {
    enable: true,
  },
  // orm 对象关系映射
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  // graphql 查询语言
  graphql: {
    enable: true,
    package: 'egg-graphql',
  },
};
