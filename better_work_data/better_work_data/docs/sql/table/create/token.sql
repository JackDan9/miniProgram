CREATE TABLE `system_tokens` (
  `id` INT(11) NOT NULL AUTO_INCREMENT COMMENT "序号",
  `uid` VARCHAR(36) NOT NULL COMMENT "用户UUID",
  `access_token` VARCHAR(64) NOT NULL COMMENT "2小时的Token",
  `refresh_token` VARCHAR(64) NOT NULL COMMENT "7天的Token",
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;