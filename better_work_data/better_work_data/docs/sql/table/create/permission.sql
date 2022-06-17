CREATE TABLE `system_permission` (
  `id` INT(11) NOT NULL AUTO_INCREMENT COMMENT "序号",
  `title` VARCHAR(64) DEFAULT NULL COMMENT "标题",
  `url` VARCHAR(64) DEFAULT NULL COMMENT "路由链接",
  `status` VARCHAR(16) DEFAULT "1" COMMENT "状态",
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;