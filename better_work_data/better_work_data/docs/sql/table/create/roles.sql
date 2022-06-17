CREATE TABLE `system_roles` (
  `id` INT(11) NOT NULL AUTO_INCREMENT COMMENT "序号",
  `rid` VARCHAR(36) DEFAULT NULL COMMENT "角色UUID",
  `name` VARCHAR(64) DEFAULT NULL COMMENT "角色名",
  `describe` VARCHAR(64) DEFAULT NULL COMMENT "角色描述",
  `status` BOOLEAN DEFAULT true COMMENT "角色状态",
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;