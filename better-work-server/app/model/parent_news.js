'use strcit';

module.exports = app => {
    const {
        STRING,
        DATE,
        INTEGER,
        TEXT
    } = app.Sequelize;
    const ParentNews = app.model.define('parent_news', {
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
        publish_on: DATE,
        created_on: DATE,
        updated_on: DATE
    });

    return ParentNews;
}