# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class NewsItems(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    order = scrapy.Field()
    title = scrapy.Field()
    summary = scrapy.Field()
    source_type = scrapy.Field()
    source_name = scrapy.Field()
    publish_at = scrapy.Field()
    created_at = scrapy.Field()
    updated_at = scrapy.Field()