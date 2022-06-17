CREATE TABLE `system_role_permissions` (
  `id`INT(11) NOT NULL AUTO_INCREMENT COMMENT "序号",
  `role_id` VARCHAR(36) DEFAULT NULL COMMENT "角色ID",
  `permission_page` TEXT DEFAULT NULL COMMENT "页面权限",
  `permission_button` TEXT DEFAULT NULL COMMENT "按钮权限",
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;