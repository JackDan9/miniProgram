'use strict';


module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;

  const SystemPermission = app.model.define('system_permission', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: STRING, // 标题
    url: STRING, // 路由连接
    status: { type: STRING, defaultValue: "1" }, //  用户状态： 0:禁用, 1:启用
    created_at: DATE,
    updated_at: DATE
  });

  return SystemPermission;
}