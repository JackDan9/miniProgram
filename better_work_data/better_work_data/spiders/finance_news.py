# -*- coding:utf-8 -*-
# # Copyright 2021, BetterWork Inc.

from datetime import datetime

import scrapy
from scrapy import Request
from urllib import parse as url_parse

from better_work_data.items.news_items import NewsItems
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
        news_item = {}

        content_url_list = response.xpath('//div[@class="date_txt"]/p/a/@href').extract()
        content_title_list = response.xpath('//div[@class="date_txt"]/h3/a/text()').extract()
        content_summary_list = response.xpath('//div[@class="date_txt"]/p/a/text()').extract()
        content_date_list = response.xpath('//div[@class="date_txt"]/div[@class="share"]/span/text()').extract()

        # 数据库中是否已经存在此数据标识
        is_exist = False
        for index in range(0, len(content_url_list)):
            try:
                sql = "SELECT * FROM `news` WHERE `news`.`title` = %s;"
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
                news_item['order'] = index
                news_item['title'] = content_title_list[index]
                news_item['summary'] = content_summary_list[index]
                news_item['summary_html'] = '<p>' + content_summary_list[index] + '</p>'
                news_item['source_type'] = 1
                news_item['source_name'] = '中国金融新闻网'
                news_item['publish_at'] = content_date_list[index]
                if news_item.get('created_at') is None:
                    news_item['created_at'] = datetime.now()
                if news_item.get('updated_at') is None:
                    news_item['updated_at'] = datetime.now()
                
                # yield news_item
                try:
                    sql = "INSERT INTO `news`(`order`, `title`, `summary`, `summary_html`, `source_type`, `source_name`, `publish_at`, `created_at`, `updated_at`) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s);"
                    conn = self.db.connect()
                    cursor = conn.cursor()
                    params = (news_item['order'], news_item['title'], news_item['summary'], news_item['summary_html'], news_item['source_type'], news_item['source_name'], news_item['publish_at'], news_item['created_at'], news_item['updated_at'])
                    cursor.execute(sql, params)
                    conn.commit()
                except Exception as e:
                    print(str(e))
                finally:
                    cursor.close()
                yield Request(url='https://www.financialnews.com.cn/yh' + content_url_list[index][1:], callback=self.parse_data, meta=news_item)

    def parse_data(self, response):
        data = response.meta
        parent_data = None

        try:
            sql = "SELECT * FROM `news` WHERE `news`.`title` = %s;"
            conn = self.db.connect()
            cursor = conn.cursor()
            cursor.execute(sql, data['title'])
            parent_data = cursor.fetchone()
            conn.commit()
        except Exception as e:
            print(str(e))
        finally:
            cursor.close()
        
        news_details_item = {}

        # attachment_list = response.xpath('//div[@id="zoom"]/p/a').extract()
        # if len(attachment_list) != 0:
        #     news_details_item['is_attachment'] = True
        #     news_details_item['attachment_name'] = response.xpath('//div[@id="zoom"]/p/a/text()').extract()[0]
        #     news_details_item['attachment_url'] = 'http://www.pbc.gov.cn' + response.xpath('//div[@id="zoom"]/p/a/@href').extract()[0]
        # else:
        #     news_details_item['is_attachment'] = False
        #     news_details_item['attachment_name'] = None
        #     news_details_item['attachment_url'] = None
        
        news_details_item['is_attachment'] = False
        news_details_item['attachment_name'] = None
        news_details_item['attachment_url'] = None
        
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
            if len(response.xpath('//div[@class="content"]/div[@class="content_title"]/p/font').extract()) > 0:
                content_title = response.xpath('//div[@class="content"]/div[@class="content_title"]/p/font/text()').extract()[0]
            else:
                content_title = response.xpath('//div[@class="content"]/div[@class="content_title"]/p/text()').extract()[0] + ',' + response.xpath('//div[@class="content"]/div[@class="content_title"]/p/font/text()').extract()[0]
        else:
            if len(response.xpath('//div[@class="content"]/div[@class="content_title"]/font').extract()) > 0:
                content_title = response.xpath('//div[@class="content"]/div[@class="content_title"]/font/text()').extract()[0]
            else:
                content_title = response.xpath('//div[@class="content"]/div[@class="content_title"]/text()').extract()[0]

        content_site_name = response.xpath('//div[@class="content"]/div[@class="content_info"]/span/text()').extract()[0][3:]
        content_author_name = response.xpath('//div[@class="content"]/div[@class="content_info"]/span/text()').extract()[1][3:]
        content_date = response.xpath('//div[@class="content"]/div[@class="content_info"]/span/text()').extract()[2][5:]
        
        # content_date 
        news_details_item['parent_id'] = parent_data['id']
        news_details_item['language'] = 'zh-CN'
        news_details_item['author_name'] = content_author_name
        news_details_item['site_name'] = content_site_name
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