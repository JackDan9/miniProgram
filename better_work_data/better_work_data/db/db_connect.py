# -*- coding:utf-8 -*-

from datetime import datetime

import pymysql
from scrapy.utils.project import get_project_settings  # 导入settings配置

class DBConnect(object):
    def __init__(self):
        settings = get_project_settings()  # 获取settings配置, 设置需要的信息

        db = pymysql.connect(
            host=settings['MYSQL_HOST'],
            database=settings['MYSQL_DBNAME'],
            user=settings['MYSQL_USER'],
            password=settings['MYSQL_PASSWD'],
            charset='utf8',  # 编码要加上, 否则可能出现中文乱码问题
            cursorclass=pymysql.cursors.DictCursor
        )

        self.db = db
    
    def connect(self):
        return self.db
