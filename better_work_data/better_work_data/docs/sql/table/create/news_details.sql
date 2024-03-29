CREATE TABLE `news_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) NOT NULL,
  `language` varchar(16) DEFAULT NULL,
  `author_name` varchar(64) DEFAULT NULL,
  `site_name` varchar(64) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `summary` text DEFAULT NULL,
  `summary_html` text DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `mobile_url` varchar(255) DEFAULT NULL,
  `is_attachment` tinyint(1) DEFAULT NULL,
  `attachment_name` varchar(255) DEFAULT NULL,
  `attachment_url` varchar(255) DEFAULT NULL,
  `publish_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;