# -*- coding:utf-8 -*-

from datetime import datetime

import scrapy
from scrapy import Request
from urllib import parse as url_parse

from better_work_data.items.news_items import NewsItems
from better_work_data.db.db_connect import DBConnect


class PeopleBankNewsSpider(scrapy.Spider):
    name = 'people_bank_news'
    allowed_domains = ['www.pbc.gov.cn']
    start_urls = [
        "http://www.pbc.gov.cn/goutongjiaoliu/113456/113469/index.html",
        # "http://group.ccb.com/cn/ccbtoday/newsv3/news_1.html" # 建设银行
    ]

    def __init__(self):
        super(PeopleBankNewsSpider, self).__init__(name='people_bank_news')
        self.content_url_list = []
        self.content_text_list = []
        self.content_date_list = []
        self.db = DBConnect()

    def start_requests(self):
        for url in self.start_urls:
            yield Request(url=url, callback=self.parse, method='POST')

    def parse(self, response):
        news_item = {}

        self.content_url_list = response.xpath('//*[@height="22"]/font/a/@href').extract()
        self.content_title_list = response.xpath('//*[@height="22"]/font/a/text()').extract()
        self.content_date_list = response.xpath('//*[@height="22"]/span/text()').extract()
        
        # 数据库中是否已经存在此数据标识
        is_exist = False
        for index in range(0, len(self.content_url_list)):
            try:
                select_news_sql = "SELECT * FROM `news` WHERE `news`.`title` = %s;"
                conn = self.db.connect()
                cursor = conn.cursor()
                cursor.execute(select_news_sql, self.content_title_list[index])
                is_exist = len(cursor.fetchall()) > 0
                conn.commit()
            except Exception as e:
                print(str(e))
            finally:
                cursor.close()

            if is_exist:
                continue
            else:
                news_item['order'] = index
                news_item['title'] = self.content_title_list[index]
                news_item['summary'] = ''
                news_item['summary_html'] = ''
                news_item['source_type'] = 0
                news_item['source_name'] = '中国人民银行'
                news_item['publish_at'] = self.content_date_list[index]
                if news_item.get('created_at') is None:
                    news_item['created_at'] = datetime.now()
                if news_item.get('updated_at') is None:
                    news_item['updated_at'] = datetime.now()
                # yield news_item
                try:
                    insert_news_sql = "INSERT INTO `news`(`order`, `title`, `summary`, `summary_html`, `source_type`, `source_name`, `publish_at`, `created_at`, `updated_at`) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s);"
                    conn = self.db.connect()
                    cursor = conn.cursor()
                    params = (news_item['order'], news_item['title'], news_item['summary'], news_item['summary_html'], news_item['source_type'], news_item['source_name'], news_item['publish_at'], news_item['created_at'], news_item['updated_at'])
                    cursor.execute(insert_news_sql, params)
                    conn.commit()
                except Exception as e:
                    print(str(e))
                finally:
                    cursor.close()
                yield Request(url='http://www.pbc.gov.cn' + self.content_url_list[index], callback=self.parse_data, meta=news_item, method='POST')

    def parse_data(self, response):
        data = response.meta
        parent_data = None
        try:
            news_sql = "SELECT * FROM `news` WHERE `news`.`title` = %s;"
            conn = self.db.connect()
            cursor = conn.cursor()
            cursor.execute(news_sql, data['title'])
            parent_data = cursor.fetchone()
            conn.commit()
        except Exception as e:
            print(str(e))
        finally:
            cursor.close()
        
        news_details_item = {}

        attachment_list = response.xpath('//div[@id="zoom"]/p/a').extract()
        if len(attachment_list) != 0:
            news_details_item['is_attachment'] = True
            news_details_item['attachment_name'] = response.xpath('//div[@id="zoom"]/p/a/text()').extract()[0]
            news_details_item['attachment_url'] = 'http://www.pbc.gov.cn' + response.xpath('//div[@id="zoom"]/p/a/@href').extract()[0]
        else:
            news_details_item['is_attachment'] = False
            news_details_item['attachment_name'] = None
            news_details_item['attachment_url'] = None
        content_list = response.xpath('//div[@id="zoom"]/p/text()').extract()
        content_html_ret = ''
        content_ret = ''

        for content in content_list:
            content_html_ret += '<p>' + content + '</p>' + '<br>'
            content_ret += content
        
        content_title = response.xpath('//h2[@style="font-size: 16px;color: #333;"]/text()').extract()[0]
        content_date = response.xpath('//td[@align="right"]/text()').extract()[2]
        
        news_details_item['parent_id'] = parent_data['id']
        news_details_item['language'] = 'zh-CN'
        news_details_item['author_name'] = '中国人民银行'
        news_details_item['site_name'] = '沟通交流'
        news_details_item['title'] = content_title
        news_details_item['summary'] = content_ret
        news_details_item['summary_html'] = content_html_ret
        news_details_item['url'] = response.url
        news_details_item['mobile_url'] = response.url
        news_details_item['publish_at'] = content_date
        if news_details_item.get('created_at') is None:
            news_details_item['created_at'] = datetime.now()
        if news_details_item.get('updated_at') is None:
            news_details_item['updated_at'] = datetime.now()

        news_details_sql = "INSERT INTO `news_details`(`parent_id`, `language`, `author_name`, `site_name`, `title`, `summary`, `summary_html`, `url`, `mobile_url`, `is_attachment`, `attachment_name`, `attachment_url`, `publish_at`, `created_at`, `updated_at`) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);"
        try:
            conn = self.db.connect()
            cursor = conn.cursor()
            params = (news_details_item['parent_id'], news_details_item['language'], news_details_item['author_name'], news_details_item['site_name'], news_details_item['title'], news_details_item['summary'], news_details_item['summary_html'], news_details_item['url'], news_details_item['mobile_url'], news_details_item['is_attachment'], news_details_item['attachment_name'], news_details_item['attachment_url'], news_details_item['publish_at'], news_details_item['created_at'], news_details_item['updated_at'])
            cursor.execute(news_details_sql, params)
            conn.commit()
        except Exception as e:
            print(str(e))
        finally:
            cursor.close()