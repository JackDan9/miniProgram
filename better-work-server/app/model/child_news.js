'use strcit';

module.exports = app => {
  const { INTEGER, STRING, DATE, TEXT, BOOLEAN } = app.Sequelize;

  const ChildNews = app.model.define('child_news', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    parent_id: INTEGER,
    language: STRING(16),
    author_name: STRING(64),
    site_name: STRING(64),
    title: STRING(255),
    summary: TEXT,
    summary_html: TEXT,
    url: STRING(255),
    mobile_url: STRING(255),
    is_attachment: BOOLEAN,
    attachment_name: STRING(255),
    attachment_url: STRING(255),
    publish_on: DATE,
    created_on: DATE,
    updated_on: DATE
  });

  return ChildNews;
}