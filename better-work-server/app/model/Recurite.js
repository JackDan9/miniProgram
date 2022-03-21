/**
 * Description: 招聘表model
 * Date: 2022-02-22
 * Creator: JackDan
 */
'use strcit';

module.exports = app => {
  const {
    STRING,
    DATE,
    INTEGER,
    TEXT
  } = app.Sequelize;
  const Recurite = app.model.define('recurites', {
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

  return Recurite;
}