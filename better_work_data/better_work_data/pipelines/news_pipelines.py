# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html

# useful for handling different item types with a single interface

from better_work_data.db.db_helper import DBHelper

# 新闻表
class NewsPipeline(object):
    # 连接数据库
    def __init__(self):
        self.db = DBHelper()
    
    def process_item(self, news_item, spider):
        # 插入数据库
        if news_item['is_parent']:
            self.db.insert_news(news_item)
        else:
            self.db.insert_news_details(news_item)
        return news_item