-- UUID: 对于 UUID,使用 DataTypes.UUID. 对于 PostgreSQL 和 SQLite,它会是 UUID 数据类型;对于 MySQL,它则变成CHAR(36). Sequelize 可以自动为这些字段生成 UUID,只需使用 Sequelize.UUIDV1 或 Sequelize.UUIDV4 作为默认值即可

CREATE TABLE `system_users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT COMMENT "序号",
  `uid` VARCHAR(36) DEFAULT NULL COMMENT "用户UUID",
  `username` VARCHAR(64) NOT NULL COMMENT "用户名",
  `password` VARCHAR(64) NOT NULL COMMENT "用户密码",
  `email` VARCHAR(64) DEFAULT NULL COMMENT "邮箱",
  `name` VARCHAR(64) DEFAULT NULL COMMENT "登录名",
  `sex` VARCHAR(16) DEFAULT NULL COMMENT "性别",
  `age` INT(11) DEFAULT NULL COMMENT "年龄",
  `avatar` VARCHAR(64) DEFAULT NULL COMMENT "头像链接",
  `company` VARCHAR(64) DEFAULT NULL COMMENT "公司",
  `department` VARCHAR(64) DEFAULT NULL COMMENT "部门",
  `telephone` VARCHAR(16) DEFAULT NULL COMMENT "电话",
  `mobile_phone` VARCHAR(16) DEFAULT NULL COMMENT "手机号",
  `info` VARCHAR(64) DEFAULT NULL COMMENT "备注说明",
  `role_id` VARCHAR(36) DEFAULT NULL COMMENT "角色",
  `status` VARCHAR(16) DEFAULT NULL COMMENT "用户状态",
  `last_login_time` DATETIME DEFAULT NULL COMMENT "上次登录时间",
  `unionid` VARCHAR(64) DEFAULT NUll COMMENT "微信unionid",
  `openid` VARCHAR(64) DEFAULT NULL COMMENT "微信openid",
  `session_key` VARCHAR(64) DEFAULT NULL COMMENT "微信session_key",
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`),
  CONSTRAINT username_unique UNIQUE(username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;