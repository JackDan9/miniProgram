CREATE TABLE `histories` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '序号',
  `order` int(11) DEFAULT NULL COMMENT '新闻排序',
  `title` varchar(255) DEFAULT NULL COMMENT '新闻标题',
  `summary` text DEFAULT NULL COMMENT '新闻描述',
  `summary_html` text DEFAULT NULL COMMENT '新闻描述H5',
  `source_type` int(11) DEFAULT NULL COMMENT '新闻来源类型',
  `source_name` varchar(64) DEFAULT NULL COMMENT '新闻来源名称',
  `publish_at` datetime DEFAULT NULL ECOMMENT '新闻更新日期',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;