# -*- coding:utf-8 -*-
# # Copyright 2021, BetterWork Inc.

from datetime import datetime

import scrapy
from scrapy import Request
from urllib import parse as url_parse

from better_work_data.items.parent_news_items import ParentNewsItems
from better_work_data.db.db_connect import DBConnect


class FinanceNewsSpider(scrapy.Spider):
    name = 'finance_news'
    allowed_domains = ['www.financialnews.com.cn']
    start_urls = [
        "https://www.financialnews.com.cn/yh/"
    ]

    def __init__(self):
        super(FinanceNewsSpider, self).__init__(name='finance_news')
        self.db = DBConnect()
    
    def start_requests(self):
        for url in self.start_urls:
            yield Request(url=url, callback=self.parse)

    def parse(self, response):
        parent_news_item = {}

        content_url_list = response.xpath('//div[@class="date_txt"]/p/a/@href').extract()
        content_title_list = response.xpath('//div[@class="date_txt"]/h3/a/text()').extract()
        content_summary_list = response.xpath('//div[@class="date_txt"]/p/a/text()').extract()
        content_date_list = response.xpath('//div[@class="date_txt"]/div[@class="share"]/span/text()').extract()

        # 数据库中是否已经存在此数据标识
        is_exist = False
        for index in range(0, len(content_url_list)):
            try:
                sql = "SELECT * FROM `parent_news` WHERE `parent_news`.`title` = %s;"
                conn = self.db.connect()
                cursor = conn.cursor()
                cursor.execute(sql, content_title_list[index])
                is_exist = len(cursor.fetchall()) > 0
                conn.commit()
            except Exception as e:
                print(str(e))
            finally:
                cursor.close()

            if is_exist:
                continue
            else:
                parent_news_item['order'] = index
                parent_news_item['title'] = content_title_list[index]
                parent_news_item['summary'] = content_summary_list[index]
                parent_news_item['summary_html'] = '<p>' + content_summary_list[index] + '</p>'
                parent_news_item['source_type'] = 1
                parent_news_item['source_name'] = '中国金融新闻网'
                parent_news_item['publish_on'] = content_date_list[index]
                if parent_news_item.get('created_on') is None:
                    parent_news_item['created_on'] = datetime.now()
                if parent_news_item.get('updated_on') is None:
                    parent_news_item['updated_on'] = datetime.now()
                
                # yield parent_news_item
                try:
                    sql = "INSERT INTO `parent_news`(`order`, `title`, `summary`, `summary_html`, `source_type`, `source_name`, `publish_on`, `created_on`, `updated_on`) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s);"
                    conn = self.db.connect()
                    cursor = conn.cursor()
                    params = (parent_news_item['order'], parent_news_item['title'], parent_news_item['summary'], parent_news_item['summary_html'], parent_news_item['source_type'], parent_news_item['source_name'], parent_news_item['publish_on'], parent_news_item['created_on'], parent_news_item['updated_on'])
                    cursor.execute(sql, params)
                    conn.commit()
                except Exception as e:
                    print(str(e))
                finally:
                    cursor.close()
                yield Request(url='https://www.financialnews.com.cn/yh' + content_url_list[index][1:], callback=self.parse_data, meta=parent_news_item)

    def parse_data(self, response):
        data = response.meta
        parent_data = None

        try:
            sql = "SELECT * FROM `parent_news` WHERE `parent_news`.`title` = %s;"
            conn = self.db.connect()
            cursor = conn.cursor()
            cursor.execute(sql, data['title'])
            parent_data = cursor.fetchone()
            conn.commit()
        except Exception as e:
            print(str(e))
        finally:
            cursor.close()
        
        child_news_item = {}

        # attachment_list = response.xpath('//div[@id="zoom"]/p/a').extract()
        # if len(attachment_list) != 0:
        #     child_news_item['is_attachment'] = True
        #     child_news_item['attachment_name'] = response.xpath('//div[@id="zoom"]/p/a/text()').extract()[0]
        #     child_news_item['attachment_url'] = 'http://www.pbc.gov.cn' + response.xpath('//div[@id="zoom"]/p/a/@href').extract()[0]
        # else:
        #     child_news_item['is_attachment'] = False
        #     child_news_item['attachment_name'] = None
        #     child_news_item['attachment_url'] = None
        
        child_news_item['is_attachment'] = False
        child_news_item['attachment_name'] = None
        child_news_item['attachment_url'] = None
        
        # Custom_UnionStyle
        if len(response.xpath('//div[@class="Custom_UnionStyle"]/p').extract()) > 0:
            if len(response.xpath('//div[@class="Custom_UnionStyle"]/p/text()').extract()) > 0:
                content_list = response.xpath('//div[@class="Custom_UnionStyle"]/p/text()').extract()
            else:
                content_list = response.xpath('//div[@class="Custom_UnionStyle"]/p/font/text()').extract()
            
            content_html_list = response.xpath('//div[@class="Custom_UnionStyle"]/p').extract()
        else:
            if len(response.xpath('//div[@class="TRS_Editor"]/p/text()').extract()) > 0:
                content_list = response.xpath('//div[@class="TRS_Editor"]/p/text()').extract()
            else:
                content_list = response.xpath('//div[@class="TRS_Editor"]/p/font/text()').extract()
            content_html_list =  response.xpath('//div[@class="TRS_Editor"]/p').extract()
        content_html_ret = ''
        content_ret = ''

        for content_index in range(0, len(content_list)):    
            content_ret += content_list[content_index]
        for content_html_index in range(0, len(content_html_list)):
            content_html_ret += content_html_list[content_html_index]
        
        if len(response.xpath('//div[@class="content"]/div[@class="content_title"]/p').extract()) > 0:
            content_title = response.xpath('//div[@class="content"]/div[@class="content_title"]/p/text()').extract()[0] + ',' + response.xpath('//div[@class="content"]/div[@class="content_title"]/p/font/text()').extract()[0]
        else:
            content_title = response.xpath('//div[@class="content"]/div[@class="content_title"]/text()').extract()[0]

        content_site_name = response.xpath('//div[@class="content"]/div[@class="content_info"]/span/text()').extract()[0][3:]
        content_author_name = response.xpath('//div[@class="content"]/div[@class="content_info"]/span/text()').extract()[1][3:]
        content_date = response.xpath('//div[@class="content"]/div[@class="content_info"]/span/text()').extract()[2][5:]
        
        # content_date 
        child_news_item['parent_id'] = parent_data['id']
        child_news_item['language'] = 'zh-CN'
        child_news_item['author_name'] = content_author_name
        child_news_item['site_name'] = content_site_name
        child_news_item['title'] = content_title
        child_news_item['summary'] = content_ret
        child_news_item['summary_html'] = content_html_ret
        child_news_item['url'] = response.url
        child_news_item['mobile_url'] = response.url
        child_news_item['publish_on'] = content_date
        if child_news_item.get('created_on') is None:
            child_news_item['created_on'] = datetime.now()
        if child_news_item.get('updated_on') is None:
            child_news_item['updated_on'] = datetime.now()

        child_news_sql = "INSERT INTO `child_news`(`parent_id`, `language`, `author_name`, `site_name`, `title`, `summary`, `summary_html`, `url`, `mobile_url`, `is_attachment`, `attachment_name`, `attachment_url`, `publish_on`, `created_on`, `updated_on`) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);"
        try:
            conn = self.db.connect()
            cursor = conn.cursor()
            params = (child_news_item['parent_id'], child_news_item['language'], child_news_item['author_name'], child_news_item['site_name'], child_news_item['title'], child_news_item['summary'], child_news_item['summary_html'], child_news_item['url'], child_news_item['mobile_url'], child_news_item['is_attachment'], child_news_item['attachment_name'], child_news_item['attachment_url'], child_news_item['publish_on'], child_news_item['created_on'], child_news_item['updated_on'])
            cursor.execute(child_news_sql, params)
            conn.commit()
        except Exception as e:
            print(str(e))
        finally:
            cursor.close()