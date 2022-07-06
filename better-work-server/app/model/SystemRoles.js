'use strict';

const { generateUUID } = require("../database/uuid");


module.exports = app => {
  const { BOOLEAN, DATE, INTEGER, STRING, UUID } = app.Sequelize

  const SystemRoles = app.model.define("system_roles", {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rid: {
      type: UUID,
      defaultValue: () => {
        return generateUUID();
      },
    },
    name: STRING, // 名字
    describe: STRING, // 角色描述
    status: { 
      type: BOOLEAN, 
      defaultValue: true, 
    }, //  用户状态： false:禁用, true:启用
    created_at: DATE,
    updated_at: DATE
  });

  return SystemRoles;
};