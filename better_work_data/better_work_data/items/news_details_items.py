# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class NesDetailsItems(scrapy.Item):
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
    publish_at = scrapy.Field()
    created_at = scrapy.Field()
    updated_at = scrapy.Field()
