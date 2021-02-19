# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class ChildNewsItems(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    parent_id = scrapy.Field()
    language = scrapy.Field()
    author_name = scrapy.Field()
    site_name = scrapy.Field()
    title = scrapy.Field()
    summary = scrapy.Field()
    url = scrapy.Field()
    mobile_url = scrapy.Field()
    is_attachment = scrapy.Field()
    attachment_name = scrapy.Field()
    attachment_url = scrapy.Field()
    publish_on = scrapy.Field()
    created_on = scrapy.Field()
    updated_on = scrapy.Field()
