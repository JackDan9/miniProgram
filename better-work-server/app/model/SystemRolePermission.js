'use strict';

module.exports = app => {
  const { DATE, INTEGER, UUID, TEXT } = app.Sequelize;

  const SystemRolePermission = app.model.define("system_role_permissions", {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    role_id: UUID, // 角色ID
    permission_page: TEXT("long"), // 页面权限
    permission_button: TEXT("long"), // 按钮权限
    created_at: DATE,
    updated_at: DATE
  });

  return SystemRolePermission;
}