CREATE TABLE `recurite_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT "序号",
  `parent_id` int(11) NOT NULL COMMENT "父表ID",
  `language` varchar(16) DEFAULT NULL COMMENT "语言",
  `author_name` varchar(64) DEFAULT NULL COMMENT "作者名字",
  `site_name` varchar(64) DEFAULT NULL COMMENT "网站名称",
  `title` varchar(255) DEFAULT NULL COMMENT "标题",
  `summary` text DEFAULT NULL COMMENT "详情",
  `summary_html` text DEFAULT NULL COMMENT "详情富文本",
  `url` varchar(255) DEFAULT NULL COMMENT "URL链接",
  `mobile_url` varchar(255) DEFAULT NULL COMMENT "移动端URL链接",
  `is_attachment` tinyint(1) DEFAULT NULL COMMENT "是否存在附件",
  `attachment_name` varchar(255) DEFAULT NULL COMMENT "附件名称",
  `attachment_url` varchar(255) DEFAULT NULL COMMENT "附件链接URL",
  `publish_at` datetime DEFAULT NULL COMMENT "提供时间",
  `created_at` datetime DEFAULT NULL COMMENT "创建时间",
  `updated_at` datetime DEFAULT NULL COMMENT "更新时间",
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;