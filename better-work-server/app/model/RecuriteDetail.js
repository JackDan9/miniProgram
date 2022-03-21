/**
 * Description: 招聘详情表model
 * Date: 2022-02-23
 * Creator: JackDan
 */
'use strcit';

module.exports = app => {
  const {
    STRING,
    DATE,
    INTEGER,
    TEXT,
    BOOLEAN,
  } = app.Sequelize;

  const RecuriteDetail = app.model.define('recurite_details', {
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
    publish_at: DATE,
    created_at: DATE,
    updated_at: DATE
  });

  return RecuriteDetail;
}