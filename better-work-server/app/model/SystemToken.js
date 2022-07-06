'use strict';

module.exports = app => {
  const { INTEGER, STRING, UUID, DATE } = app.Sequelize;

  const SystemToken = app.model.define('system_tokens', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    uid: { 
      type: UUID, 
      unique: true, 
      allowNull: false,
    }, // 用户id
    access_token: { 
      type: STRING, 
      unique: true, 
      allowNull: false,
    }, // 2小时的 Token
    refresh_token: { 
      type: STRING, 
      unique: true, 
      allowNull: false,
    }, // 7天的 Token
    created_at: DATE,
    updated_at: DATE
  });

  return SystemToken;
}