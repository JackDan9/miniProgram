# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class ParentNewsItems(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    order = scrapy.Field()
    title = scrapy.Field()
    summary = scrapy.Field()
    source_type = scrapy.Field()
    source_name = scrapy.Field()
    publish_on = scrapy.Field()
    created_on = scrapy.Field()
    updated_on = scrapy.Field()