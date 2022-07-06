/**
 * 新闻表
 */
'use strcit';

module.exports = app => {
  const {
    STRING,
    DATE,
    INTEGER,
    TEXT
  } = app.Sequelize;
  const News = app.model.define('news', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    order: INTEGER,
    title: STRING(255),
    summary: TEXT,
    summary_html: TEXT,
    source_type: INTEGER,
    source_name: STRING(64),
    publish_at: DATE,
    created_at: DATE,
    updated_at: DATE
  });

  return News;
}