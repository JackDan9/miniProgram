# -*- coding:utf-8 -*-

from datetime import datetime

import pymysql
from twisted.enterprise import adbapi
from scrapy.utils.project import get_project_settings  # 导入settings配置


class DBHelper():
    '''这个类是读取settings中的配置，自行修改代码进行操作
    Twisted是用Python实现的基于事件驱动的网络引擎框架;
    Twisted支持许多常见的传输及应用层协议, 
    包括TCP、UDP、SSL/TLS、HTTP、IMAP、SSH、IRC以及FTP。
    就像Python一样, Twisted也具有“内置池”(batteries-included)的特点。
    Twisted对于其支持的所有协议都带有客户端和服务器实现, 同时附带有基于命令行的工具, 使得配置和部署产品级的Twisted应用变得非常方便。
    '''
    

    def __init__(self):
        settings = get_project_settings()  # 获取settings配置, 设置需要的信息

        db_params = dict(
            host=settings['MYSQL_HOST'],
            db=settings['MYSQL_DBNAME'],
            user=settings['MYSQL_USER'],
            passwd=settings['MYSQL_PASSWD'],
            charset='utf8',  # 编码要加上, 否则可能出现中文乱码问题
            cursorclass=pymysql.cursors.DictCursor,
            use_unicode=False
        )

        db_pool = adbapi.ConnectionPool('pymysql', **db_params)
        self.db_pool = db_pool

    # 连接数据库
    def connect(self):
        return self.db_pool 

    # 插入数据到数据库
    def insert_parent_news(self, parent_news_item):
        parent_news_sql = "INSERT INTO `parent_news`(`order`, `title`, `summary`, `source_type`, `source_name`, `publish_on`, `created_on`, `updated_on`) VALUES(%s, %s, %s, %s, %s, %s, %s, %s);"
        # 调用插入的方法
        query = self.db_pool.runInteraction(self._conditional_parent_news_insert, sql=parent_news_sql, parent_news_item=parent_news_item)
        # 调用一场处理方法
        query.addErrback(self._handle_error)
        return parent_news_item

    def insert_child_news(self, child_news_item):
        child_news_sql = "INSERT INTO `child_news`(`parent_id`, `language`, `author_name`, `site_name`, `title`, `summary`, `url`, `mobile_url`, `is_attachment`, `attachment_name`, `attachment_url`, `publish_on`, `created_on`, `updated_on`) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        query = self.db_pool.runInteraction(self._conditional_child_news_insert, sql=child_news_sql, child_news_item=child_news_item)
        query.addErrback(self._handle_error)

        return child_news_item

    def _conditional_parent_news_insert(self, tx, sql=None, parent_news_item=None):
        if parent_news_item.get('created_on') is None:
            parent_news_item['created_on'] = datetime.now()
        if parent_news_item.get('updated_on') is None:
            parent_news_item['updated_on'] = datetime.now()
        params = (parent_news_item['order'], parent_news_item['title'], parent_news_item['summary'], parent_news_item['source_type'], parent_news_item['source_name'], parent_news_item['publish_on'], parent_news_item['created_on'], parent_news_item['updated_on'])
        tx.execute(sql, params)

    def _conditional_child_news_insert(self, tx, sql=None, child_news_item=None):
        if child_news_item.get('created_on') is None:
            child_news_item['created_on'] = datetime.now()
        if child_news_item.get('updated_on') is None:
            child_news_item['updated_on'] = datetime.now()
        params = (child_news_item['parent_id'], child_news_item['language'], child_news_item['author_name'], child_news_item['site_name'], child_news_item['title'], child_news_item['summary'],
                  child_news_item['url'], child_news_item['mobile_url'], child_news_item['is_attachment'], child_news_item['attachment_name'], child_news_item['attachment_url'], child_news_item['publish_on'])
        tx.execute(sql, params)

    def _handle_error(self, failure):
        print('--------------database operation exception!!-----------------')
        print(failure)
